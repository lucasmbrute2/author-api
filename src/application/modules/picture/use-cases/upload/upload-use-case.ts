import { AuthorRepository } from "@app/repositories/author-repository";
import { PictureRepository } from "@app/repositories/picture-repository";
import { StorageProvider } from "@app/repositories/storage-repository";
import { NotFoundError } from "@shared/errors/app-error";
import "reflect-metadata";
import { inject, injectable } from "tsyringe";
import { makePicture } from "../../factory/make-picture";
import { enviromentVariables } from "@app/constraints/enviroment-variables";

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
        picture[
            "htmlUrl"
        ] = `https://${enviromentVariables.aws.bucketName}.s3.${enviromentVariables.aws.region}.amazonaws.com/test/${picture.aliasKey}`;
        await this.pictureRepository.save(picture);
        return picture;
    }
}
