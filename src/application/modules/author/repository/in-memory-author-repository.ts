import { AuthorRepository } from "application/repositories/author-repository";
import { Author } from "../entities/author-entity";
import { Email } from "../entities/validation";
import { makeAuthor } from "../factory/makeAuthor";

export class InMemoryRepository implements AuthorRepository {
    public authors: Author[] = [];

    async create(data: Author): Promise<void> {
        this.authors.push(data);
    }

    async findByEmail(email: Email): Promise<Author | null> {
        const author = this.authors.find(
            (author) => author.email.value === email.value
        );

        if (!author) return null;
        return author;
    }

    async update(id: string, data: Partial<Author>): Promise<Author> {
        const authorIndex = this.authors.findIndex(
            (author) => author.id === id
        );

        const updatedAuthor = makeAuthor({
            ...this.authors[authorIndex],
            ...data,
        });

        this.authors[authorIndex] = updatedAuthor;
        return updatedAuthor;
    }
}
