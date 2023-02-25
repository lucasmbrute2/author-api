import {
    AuthorRepository,
    EditProfileProps,
} from "../../../../repositories/author-repository";
import { NotFoundError } from "../../../../../shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { Author } from "../../entities/author-entity";
import { Name } from "../../entities/validation";

interface EditProfileUseCaseResponse {
    author: Author;
}

@injectable()
export class EditProfileUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository
    ) {}

    async execute(
        req: EditProfileProps,
        id: string
    ): Promise<EditProfileUseCaseResponse> {
        const author = await this.authorRepository.findByID(id);
        if (!author) throw new NotFoundError("User not found");

        const newAuthor = await this.authorRepository.saveProfile(id, {
            ...req,
            name: new Name(req.name).value,
        });

        return {
            author: newAuthor,
        };
    }
}
