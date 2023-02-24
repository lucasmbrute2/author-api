import { BadRequestError, NotFoundError } from "@shared/errors/app-error";
import { beforeEach, describe, expect, it } from "vitest";
import { makeAuthor } from "../factory/makeAuthor";
import { makeUserInRequest } from "../factory/makeAuthorRequest";
import { InMemoryRepository } from "../repository/in-memory-author-repository";
import { AuthAuthorUseCase } from "./auth-author-use-case";
import { RegisterAuthorUseCase } from "./register-author-use-case";

let authAuthorUseCase: AuthAuthorUseCase;
let authorRepository: InMemoryRepository;

describe("Auth Author", () => {
    beforeEach(() => {
        authorRepository = new InMemoryRepository();
        authAuthorUseCase = new AuthAuthorUseCase(authorRepository);
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
});
