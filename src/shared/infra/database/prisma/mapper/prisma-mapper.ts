import { Author } from "../../../../../application/modules/author/entities/author-entity";
import {
    Email,
    Name,
    Password,
} from "../../../../../application/modules/author/entities/validation";
import { Author as rawAuthor } from "@prisma/client";

export class PrismaMapper {
    static toPrisma(author: Author): rawAuthor {
        return {
            id: author.id,
            name: author.name.value,
            bio: author.bio,
            created_at: author.created_at,
            deleted_at: author.deleted_at,
            password: author.password.value,
            profile_picture: author.profile_picture,
            username: author.email.value,
        };
    }

    static toDomain(author: rawAuthor): Author {
        const { bio, id, name, password, username } = author;

        return new Author({
            id: id,
            email: new Email(username),
            name: new Name(name),
            password: new Password(password),
            bio,
        });
    }
}
