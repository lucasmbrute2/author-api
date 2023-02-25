import { AuthorRepository } from "../../../../repositories/author-repository";
import { StorageProvider } from "../../../../repositories/storage-repository";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { makePicture } from "../../factory/make-picture";

@injectable()
export class UploadPictureUseCase {
    constructor(
        @inject("StorageProvider")
        private storageProvider: StorageProvider,
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository
    ) {}

    async execute(file: Express.Multer.File, id: string) {
        const author = await this.authorRepository.findByID(id);
        const picture = makePicture(file);

        await this.storageProvider.save(picture);

        if (!author) throw new NotFoundError("Author not found");
        return picture;
    }
}
