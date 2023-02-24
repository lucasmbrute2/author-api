import { Author } from "@app/modules/author/entities/author-entity";
import { Email } from "@app/modules/author/entities/validation";

export interface AuthorRepository {
    create(data: Author): Promise<void>;
    findByEmail(email: Email): Promise<Author | null>;
}
