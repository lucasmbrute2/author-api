import { inject, injectable } from "tsyringe";
import { PictureRepository } from "@app/repositories/picture-repository";
import { AuthorRepository } from "@app/repositories/author-repository";
import {
    BadRequestError,
    NotFoundError,
    Unauthorized,
} from "@shared/errors/app-error";
import { Picture } from "../../entities/picture";

@injectable()
export class SoftDeleteUseCase {
    constructor(
        @inject("PictureRepository")
        private pictureRepository: PictureRepository,
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository
    ) {}
    async execute(aliasKey: string, id: string): Promise<Picture> {
        if (!id) throw new Unauthorized("Author ID is required");
        if (!aliasKey) throw new BadRequestError("Picture name is required");

        const author = await this.authorRepository.findByID(id);
        if (!author) throw new NotFoundError("Author not found");

        const picture = await this.pictureRepository.findByName(aliasKey);
        if (!picture || picture.deletedAt)
            throw new NotFoundError("Picture not found");

        return await this.pictureRepository.softDelete(picture.aliasKey);
    }
}
