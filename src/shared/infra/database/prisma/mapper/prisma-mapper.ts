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
        return new Author({
            id: author.id,
            email: new Email(author.username),
            name: new Name(author.name),
            password: new Password(author.password),
        });
    }
}
