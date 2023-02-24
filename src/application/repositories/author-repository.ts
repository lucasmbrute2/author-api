import { Author } from "../modules/author/entities/author-entity";
import { Email } from "../../application/modules/author/entities/validation";

export interface AuthorRepository {
    create(data: Author): Promise<void>;
    findByEmail(email: Email): Promise<Author | null>;
    update(id: string, data: Partial<Author>): Promise<Author>;
}
