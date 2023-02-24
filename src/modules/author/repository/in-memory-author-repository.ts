import { AuthorRepository } from "repositories/author-repository";
import { Author } from "../entities/author-entity";
import { Email } from "../entities/validation";

export class InMemoryRepository implements AuthorRepository {
    public authors: Author[] = [];

    async create(data: Author): Promise<void> {
        this.authors.push(data);
    }

    async findByEmail(email: Email): Promise<Author | null> {
        const author = this.authors.find((author) => author.email === email);

        if (!author) return null;
        return author;
    }
}
