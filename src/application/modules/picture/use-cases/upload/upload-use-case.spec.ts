import { InMemoryRepository } from "@app/modules/author/repository/in-memory-author-repository";
import { LocalStorageProvider } from "@shared/container/providers/storage-provider/implementations/local-storage-provider";
import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryPictureRepository } from "../../repository/in-memory-picture-repository";
import { UploadPictureUseCase } from "./upload-use-case";

let uploadPictureUseCase: UploadPictureUseCase;
let pictureRepository: InMemoryPictureRepository;
let storageProvider: LocalStorageProvider;
let authorRepository: InMemoryRepository;

describe("Upload picture", () => {
    beforeEach(async () => {
        storageProvider = new LocalStorageProvider();
        authorRepository = new InMemoryRepository();
        pictureRepository = new InMemoryPictureRepository();
        uploadPictureUseCase = new UploadPictureUseCase(
            storageProvider,
            authorRepository,
            pictureRepository
        );
    });

    it("should not be able to post a picture without an author ID", () => {
        expect(async () => {});
    });
});
