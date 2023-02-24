import { beforeEach, describe, expect, it } from "vitest";
import { makeUserInRequest } from "../factory/makeAuthorRequest";
import { InMemoryRepository } from "../repository/in-memory-author-repository";
import { RegisterAuthorUseCase } from "./register-author-use-case";

let authorRepository: InMemoryRepository;
let registerAuthorUseCase: RegisterAuthorUseCase;
const inMemoryRedis = [];

describe("Register Author", () => {
    beforeEach(() => {
        authorRepository = new InMemoryRepository();
        registerAuthorUseCase = new RegisterAuthorUseCase(
            authorRepository,
            inMemoryRedis
        );
    });

    it("should be able to register an author", () => {
        expect(async () => {
            const author = makeUserInRequest();
            await registerAuthorUseCase.execute(author);
        }).not.toThrow();
    });
});
