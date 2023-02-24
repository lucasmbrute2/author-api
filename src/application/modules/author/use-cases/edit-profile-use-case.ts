import "reflect-metadata";
import { AuthorRepository } from "@app/repositories/author-repository";
import { NotFoundError } from "@shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { Author } from "../entities/author-entity";
import { makeAuthor } from "../factory/makeAuthor";

interface EditProfileProps {
    id: string;
    data: Partial<Author>;
}

interface EditProfileUseCaseResponse {
    author: Author;
}

@injectable()
export class EditProfileUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository
    ) {}

    async execute(req: EditProfileProps): Promise<EditProfileUseCaseResponse> {
        const author = await this.authorRepository.findByID(req.id);
        if (!author) throw new NotFoundError("User not found");

        const updatedAuthor = makeAuthor(author);

        const newAuthor = await this.authorRepository.save(
            req.id,
            updatedAuthor
        );
        return {
            author: newAuthor,
        };
    }
}
