import "reflect-metadata";
import { makeAuthor } from "@app/modules/author/factory/makeAuthor";
import { InMemoryRepository } from "@app/modules/author/repository/in-memory-author-repository";
import { LocalStorageProvider } from "@shared/container/providers/storage-provider/implementations/local-storage-provider";
import { BadRequestError, NotFoundError } from "@shared/errors/app-error";
import { beforeEach, describe, expect, it } from "vitest";
import { makePicture } from "../../factory/make-picture";
import { InMemoryPictureRepository } from "../../repository/in-memory-picture-repository";
import { DeleteUseCase } from "./delete-use-case";

let inMemoryAuthorRepository: InMemoryRepository;
let inMemoryPictureRepository: InMemoryPictureRepository;
let InMemoryStorage: LocalStorageProvider;
let deleteUseCase: DeleteUseCase;

describe("Delete picture", () => {
    beforeEach(() => {
        inMemoryAuthorRepository = new InMemoryRepository();
        inMemoryPictureRepository = new InMemoryPictureRepository();
        InMemoryStorage = new LocalStorageProvider();
        deleteUseCase = new DeleteUseCase(
            inMemoryPictureRepository,
            inMemoryAuthorRepository,
            InMemoryStorage
        );
    });

    it("should not be able to delete without author ID specified", () => {
        expect(async () => {
            const picture = makePicture();
            await deleteUseCase.execute(picture.name, "");
        }).rejects.toBeInstanceOf(BadRequestError);
    });

    it("should not be able to delete without picture name specified", () => {
        expect(async () => {
            const author = makeAuthor();
            await inMemoryAuthorRepository.create(author);

            await deleteUseCase.execute("", author.id);
        }).rejects.toBeInstanceOf(BadRequestError);
    });

    it("should not be able to DELETE an image without find a author", () => {
        expect(async () => {
            const author = makeAuthor();
            await deleteUseCase.execute(author.id, "wrong-id");
        }).rejects.toBeInstanceOf(NotFoundError);
    });
});
