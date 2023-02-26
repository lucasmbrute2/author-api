import "reflect-metadata";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { beforeEach, describe, expect, it } from "vitest";
import { makeAuthor } from "../../factory/makeAuthor";
import { InMemoryRepository } from "../../repository/in-memory-author-repository";
import { EditProfileUseCase } from "./edit-profile-use-case";

let authorRepository: InMemoryRepository;
let editProfileUseCase: EditProfileUseCase;

describe("Edit profile", () => {
    beforeEach(() => {
        authorRepository = new InMemoryRepository();
        editProfileUseCase = new EditProfileUseCase(authorRepository);
    });

    it("should return a error if user were not found", () => {
        expect(async () => {
            await editProfileUseCase.execute({}, "wrong-id");
        }).rejects.toBeInstanceOf(NotFoundError);
    });

    it("should be able to edit a profile", async () => {
        const author = makeAuthor();
        await authorRepository.create(author);

        const { author: updatedAuthor } = await editProfileUseCase.execute(
            { name: "new name" },
            author.id
        );

        expect(updatedAuthor.email).not.toEqual(author.email.value);
        expect(updatedAuthor).not.toEqual(author);
    });
});
