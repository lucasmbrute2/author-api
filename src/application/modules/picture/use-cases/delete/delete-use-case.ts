import "reflect-metadata";
import { AuthorRepository } from "../../../../repositories/author-repository";
import { PictureRepository } from "../../../../repositories/picture-repository";
import {
    BadRequestError,
    NotFoundError,
} from "../../../../../shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { StorageProvider } from "../../../../repositories/storage-repository";

@injectable()
export class DeleteUseCase {
    constructor(
        @inject("PictureRepository")
        private pictureRepository: PictureRepository,
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository,
        @inject("StorageProvider")
        private storageProvider: StorageProvider
    ) {}
    async execute(pictureName: string, id: string): Promise<void> {
        if (!id) throw new BadRequestError("Author ID is required");
        if (!pictureName) throw new BadRequestError("Picture name is required");

        const author = await this.authorRepository.findByID(id);
        if (!author) throw new NotFoundError("Author not found");

        const picture = await this.pictureRepository.findByName(pictureName);
        if (!picture || picture.deletedAt)
            throw new NotFoundError("Picture not found");

        const { aliasKey } = picture;

        await this.pictureRepository.delete(aliasKey);
        await this.storageProvider.delete(aliasKey);
    }
}
