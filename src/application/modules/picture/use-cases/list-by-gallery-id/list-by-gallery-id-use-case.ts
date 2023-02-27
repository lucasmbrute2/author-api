import { AuthorRepository } from "@app/repositories/author-repository";
import { PictureRepository } from "@app/repositories/picture-repository";
import { BadRequestError, NotFoundError } from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { Picture } from "../../entities/picture";

interface ListAllUseCaseResponse {
    pictures: Picture[];
}

@injectable()
export class ListByGalleryIdUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository,
        @inject("PictureRepository")
        private pictureRepository: PictureRepository
    ) {}

    async execute(page, authorID: string): Promise<ListAllUseCaseResponse> {
        if (!authorID) throw new BadRequestError("Author ID is required.");

        if (page < 1 || typeof page !== "number")
            throw new BadRequestError("Inform page in the correct formatt");

        const author = await this.authorRepository.findByID(authorID);

        if (!author) throw new NotFoundError("Author not found");

        const pictures = await this.pictureRepository.getByGalleryId(
            page,
            author.galleryId
        );

        return {
            pictures,
        };
    }
}
