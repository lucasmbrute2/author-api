import "reflect-metadata";
import { AuthorRepository } from "../../../../repositories/author-repository";
import { StorageProvider } from "../../../../repositories/storage-repository";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { makePicture } from "../../factory/make-picture";
import { PictureRepository } from "../../../../repositories/picture-repository";
import { Picture } from "../../entities/picture";

@injectable()
export class UploadPictureUseCase {
    constructor(
        @inject("StorageProvider")
        private storageProvider: StorageProvider,
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository,
        @inject("PictureRepository")
        private pictureRepository: PictureRepository
    ) {}

    async execute(file: Express.Multer.File, authorId: string) {
        const author = await this.authorRepository.findByID(authorId);

        if (!author) throw new NotFoundError("Author not found");

        const picture = makePicture(file, author.galleryId);
        await this.storageProvider.save(picture);
        await this.pictureRepository.save(picture);

        if (!author) throw new NotFoundError("Author not found");
        return picture;
    }
}
