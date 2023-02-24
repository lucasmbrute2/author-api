import "reflect-metadata";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import { makeUserInRequest } from "../factory/makeAuthorRequest";
import { InMemoryRepository } from "../repository/in-memory-author-repository";
import { RegisterAuthorUseCase } from "./register-author-use-case";
import { InMemoryRedisProvider } from "@shared/container/providers/RedisProvider/implementations/in-memory-redis-provider";
import { RedisProvider } from "@shared/container/providers/RedisProvider/implementations/redis-provider";

let authorRepository: InMemoryRepository;
let registerAuthorUseCase: RegisterAuthorUseCase;
let inMemoryRedisProvider: RedisProvider;

describe("Register Author", () => {
    beforeEach(() => {
        inMemoryRedisProvider = new RedisProvider();
        authorRepository = new InMemoryRepository();
        registerAuthorUseCase = new RegisterAuthorUseCase(
            authorRepository,
            inMemoryRedisProvider
        );
    });

    it("should be able to register an author", async () => {
        expect(async () => {
            const author = makeUserInRequest();
            await registerAuthorUseCase.execute(author);
        }).not.toThrow;
    });
});
