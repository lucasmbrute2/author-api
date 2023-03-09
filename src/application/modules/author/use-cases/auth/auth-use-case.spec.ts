import { makeRefreshToken } from "@app/modules/refresh-token/factory/make-refresh-token";
import { InMemoryRefreshTokenRepository } from "@app/modules/refresh-token/repository/in-memory-refresh-token";
import { InMemoryDateProvider } from "@shared/container/providers/date-provider/implementations/in-memory-date-provider";
import { RedisProvider } from "@shared/container/providers/redis-provider/implementations/redis-provider";
import { BadRequestError, NotFoundError } from "@shared/errors/app-error";
import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { makeAuthor } from "../../factory/makeAuthor";
import { makeUserInRequest } from "../../factory/makeAuthorRequest";
import { InMemoryRepository } from "../../repository/in-memory-author-repository";
import { AuthAuthorUseCase } from "./auth-use-case";
import { randomUUID } from "node:crypto";

let authAuthorUseCase: AuthAuthorUseCase;
let authorRepository: InMemoryRepository;
let redisProvider: RedisProvider;
let dateProvider: InMemoryDateProvider;
let refreshTokenRepository: InMemoryRefreshTokenRepository;

describe("Auth Author", () => {
    beforeEach(() => {
        authorRepository = new InMemoryRepository();
        dateProvider = new InMemoryDateProvider();
        refreshTokenRepository = new InMemoryRefreshTokenRepository();
        authAuthorUseCase = new AuthAuthorUseCase(
            authorRepository,
            redisProvider,
            dateProvider,
            refreshTokenRepository
        );
    });

    it("should throw NotFoundError if user is not found", () => {
        expect(async () => {
            const { email, password } = makeUserInRequest();
            const refreshToken = makeRefreshToken(randomUUID());

            await authAuthorUseCase.execute({
                email,
                password,
                refreshToken: refreshToken.token,
            });
        }).rejects.toBeInstanceOf(NotFoundError);
    });

    it("should be able to auth a User", () => {
        expect(async () => {
            const author = makeAuthor();
            authorRepository.create(author);
            const { token: refreshToken } = makeRefreshToken(author.id);
            const {
                email: { value: emailValue },
                password: { value: passwordValue },
            } = authorRepository.authors[0];

            await authAuthorUseCase.execute({
                email: emailValue,
                password: passwordValue,
                refreshToken,
            });
        }).rejects.toThrow();
    });

    it("should not be able to auth a user with wrong password", () => {
        expect(async () => {
            const author = makeAuthor();
            await authorRepository.create(author);
            const { token: refreshToken } = makeRefreshToken(author.id);

            return await authAuthorUseCase.execute({
                email: author.email.value,
                password: "wrong-password",
                refreshToken,
            });
        }).rejects.toBeInstanceOf(BadRequestError);
    });
});
