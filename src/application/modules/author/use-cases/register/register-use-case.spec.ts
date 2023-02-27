import { beforeEach, describe, expect, it, vitest } from "vitest";
import { makeUserInRequest } from "../../factory/makeAuthorRequest";
import { RegisterAuthorUseCase } from "./register-use-case";
import { InMemoryRedisProvider } from "@shared/container/providers/redis-provider/implementations/in-memory-redis-provider";
import { InMemoryRepository } from "../../repository/in-memory-author-repository";
import { makeAuthor } from "../../factory/makeAuthor";
import { BadRequestError } from "@shared/errors/app-error";

let authorRepository: InMemoryRepository;
let registerAuthorUseCase: RegisterAuthorUseCase;
let inMemoryRedisProvider: InMemoryRedisProvider;

describe("Register Author", () => {
    beforeEach(() => {
        inMemoryRedisProvider = new InMemoryRedisProvider();
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

    it("should not be able to register a user with a mismatching password", () => {
        expect(async () => {
            const author = makeUserInRequest();
            await registerAuthorUseCase.execute(author);
        }).rejects.toThrow;
    });

    it("should not be able to register a user thats already exists", () => {
        expect(async () => {
            const author = makeAuthor();
            await authorRepository.create(author);
            const email = authorRepository.authors[0].email;

            await registerAuthorUseCase.execute({
                email: email.value,
                confirmPassword: "Adkad!3131",
                password: "Adkad!3131",
                name: "lucas",
            });
        }).rejects.toBeInstanceOf(BadRequestError);
    });

    it("should be able to save a hash instead password in database", async () => {
        const author = makeUserInRequest();
        await registerAuthorUseCase.execute(author);

        const lastRegisteredAuthor = authorRepository.authors[0].password.value;

        expect(author.password).not.toEqual(lastRegisteredAuthor);
    });

    it("should be able to save a jwt token in memory", async () => {
        const author = makeUserInRequest();
        const {
            token,
            author: { id },
        } = await registerAuthorUseCase.execute(author);

        const storagedToken = await inMemoryRedisProvider.getValue(id);

        expect(token).toEqual(storagedToken);
    });
});
