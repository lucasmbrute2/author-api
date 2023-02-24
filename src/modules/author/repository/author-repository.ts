import { Author } from "../entities/author-entity";

export interface AuthorRepository {
    create(data: Author): void;
}
