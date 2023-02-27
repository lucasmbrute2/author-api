import { RedisProvider } from "@shared/container/providers/redis-provider/implementations/redis-provider";
import { BadRequestError, NotFoundError } from "@shared/errors/app-error";
import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { makeAuthor } from "../../factory/makeAuthor";
import { makeUserInRequest } from "../../factory/makeAuthorRequest";
import { InMemoryRepository } from "../../repository/in-memory-author-repository";
import { AuthAuthorUseCase } from "./auth-use-case";

let authAuthorUseCase: AuthAuthorUseCase;
let authorRepository: InMemoryRepository;
let redisProvider: RedisProvider;

describe("Auth Author", () => {
    beforeEach(() => {
        authorRepository = new InMemoryRepository();
        authAuthorUseCase = new AuthAuthorUseCase(
            authorRepository,
            redisProvider
        );
    });

    it("should not able to auth a user with mismatching password", () => {
        expect(async () => {
            const author = makeUserInRequest({
                confirmPassword: "wrong-password",
            });

            await authAuthorUseCase.execute(author);
        }).rejects.toBeInstanceOf(BadRequestError);
    });

    it("should throw a error if user is not found", () => {
        expect(async () => {
            const author = makeUserInRequest();
            await authAuthorUseCase.execute(author);
        }).rejects.toBeInstanceOf(NotFoundError);
    });

    it("should be able to auth a User", () => {
        expect(async () => {
            const author = makeAuthor();
            authorRepository.create(author);
            const {
                email: { value: emailValue },
                password: { value: passwordValue },
            } = authorRepository.authors[0];

            await authAuthorUseCase.execute({
                email: emailValue,
                password: passwordValue,
                confirmPassword: passwordValue,
            });
        }).not.toThrow;
    });

    it("should not be able to auth a user with wrong password", () => {
        expect(async () => {
            const author = makeAuthor();
            await authorRepository.create(author);

            return await authAuthorUseCase.execute({
                email: author.email.value,
                password: "wrong-password",
                confirmPassword: "wrong-password",
            });
        }).rejects.toThrow("Email or password incorrect");
    });
});
