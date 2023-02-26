import { Author } from "../../../../../application/modules/author/entities/author-entity";
import {
    Email,
    Name,
    Password,
} from "../../../../../application/modules/author/entities/validation";
import { Author as rawAuthor } from "@prisma/client";

export class PrismaMapper {
    static toPrisma(author: Author): rawAuthor {
        const {
            bio,
            createdAt,
            deletedAt,
            email,
            id,
            name,
            password,
            profilePicture,
            galleryId,
        } = author;

        return {
            id: id,
            name: name.value,
            bio: bio,
            created_at: createdAt,
            deleted_at: deletedAt,
            password: password.value,
            profile_picture: profilePicture,
            username: email.value,
            galleryId,
        };
    }

    static toDomain(author: rawAuthor): Author {
        const {
            bio,
            id,
            name,
            password,
            username,
            galleryId,
            created_at: createdAt,
            profile_picture: profilePicture,
        } = author;

        return new Author({
            id: id,
            email: new Email(username),
            name: new Name(name),
            password: new Password(password),
            bio,
            galleryId,
            profilePicture,
            createdAt,
        });
    }
}
