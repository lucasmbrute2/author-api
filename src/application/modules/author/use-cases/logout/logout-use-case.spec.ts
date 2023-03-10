import { InMemoryRedisProvider } from "@shared/container/providers/redis-provider/implementations/in-memory-redis-provider";
import "reflect-metadata";
import { beforeEach, describe, expect, it } from "vitest";
import { makeAuthor } from "../../factory/makeAuthor";
import { InMemoryRepository } from "../../repository/in-memory-author-repository";
import { LogoutUseCase } from "./logout-use-case";

let logoutUseCase: LogoutUseCase;
let redisRepository: InMemoryRedisProvider;
let authorRepository: InMemoryRepository;

describe("Logout", () => {
    beforeEach(() => {
        authorRepository = new InMemoryRepository();
        redisRepository = new InMemoryRedisProvider();
        logoutUseCase = new LogoutUseCase(redisRepository, authorRepository);
    });

    it("should be able to logout a user", () => {
        expect(async () => {
            const author = makeAuthor();
            await authorRepository.create(author);

            await logoutUseCase.execute(author.id);
        }).not.toThrow;
    });
});
