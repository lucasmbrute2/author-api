import {
    AuthorRepository,
    EditProfileProps,
} from "application/repositories/author-repository";
import { Author } from "../entities/author-entity";
import { Email, Name } from "../entities/validation";
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

    async saveProfile(id: string, data: EditProfileProps): Promise<Author> {
        const authorIndex = this.authors.findIndex(
            (author) => author.id === id
        );

        const { bio, name, profile_picture } = data;

        const newAuthor = makeAuthor({
            bio: bio ?? "",
            name: name && new Name(name),
            profile_picture: profile_picture ?? "",
        });

        this.authors[authorIndex] = newAuthor;
        return newAuthor;
    }

    async findByID(id: string): Promise<Author> {
        const author = this.authors.find((author) => author.id === id);

        if (!author) return null;
        return author;
    }
}
