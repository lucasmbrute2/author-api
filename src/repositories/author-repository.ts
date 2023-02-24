import { Email } from "@modules/author/entities/validation";
import { Author } from "../modules/author/entities/author-entity";

export interface AuthorRepository {
    create(data: Author): Promise<void>;
    findByEmail(email: Email): Promise<Author | null>;
}
