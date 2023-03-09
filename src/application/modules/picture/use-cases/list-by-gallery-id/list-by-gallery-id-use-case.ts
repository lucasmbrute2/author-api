import { Author } from "@app/modules/author/entities/author-entity";
import { AuthorRepository } from "@app/repositories/author-repository";
import { PictureRepository } from "@app/repositories/picture-repository";
import {
    BadRequestError,
    NotFoundError,
    Unauthorized,
} from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { Picture } from "../../entities/picture";

interface ListAllUseCaseResponse {
    pictures: Picture[];
    author: Author;
}

@injectable()
export class ListByGalleryIdUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository,
        @inject("PictureRepository")
        private pictureRepository: PictureRepository
    ) {}

    async execute(
        page: number,
        authorID: string
    ): Promise<ListAllUseCaseResponse> {
        if (!authorID) throw new Unauthorized("Author ID is required.");

        if (page < 1 || typeof page !== "number")
            throw new BadRequestError("Inform page in the correct format");

        const author = await this.authorRepository.findByID(authorID);
        if (!author) throw new NotFoundError("Author not found");

        const pictures = await this.pictureRepository.listByGalleryId(
            page,
            author.galleryId
        );

        return {
            pictures,
            author,
        };
    }
}
