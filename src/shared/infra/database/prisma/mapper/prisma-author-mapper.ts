import { Author } from "@app/modules/author/entities/author-entity";
import { Email, Name, Password } from "@app/modules/author/entities/validation";
import {
    Author as rawAuthor,
    RefreshToken as rawRefreshToken,
} from "@prisma/client";

interface token {
    refresh_token: rawRefreshToken;
}

type AuthorMayIncludeRefreshToken = rawAuthor & Partial<token>;

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
            id,
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

    static toDomain(author: AuthorMayIncludeRefreshToken): Author {
        const {
            bio,
            id,
            name,
            password,
            username,
            galleryId,
            created_at: createdAt,
            profile_picture: profilePicture,
            refresh_token,
        } = author;

        return new Author({
            id,
            email: new Email(username),
            name: new Name(name),
            password: new Password(password),
            bio,
            galleryId,
            profilePicture,
            createdAt,
            refreshToken: refresh_token?.token ?? "",
        });
    }
}
