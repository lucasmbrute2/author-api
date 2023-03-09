import { Picture } from "@app/modules/picture/entities/picture";
import { Author as RawAuthor, Picture as PictureRaw } from "@prisma/client";
import { PrismaMapper as PrismaAuthorMapper } from "@shared/infra/database/prisma/mapper/prisma-author-mapper";

interface IAuthor {
    author: RawAuthor;
}

type PictureMayIncludeAuthor = PictureRaw & Partial<IAuthor>;

export class PrismaMapper {
    static toPrisma(picture: Picture): PictureRaw {
        const {
            aliasKey: alias_key,
            createdAt: created_at,
            deletedAt: deleted_at,
            htmlUrl: html_url,
            name,
            galleryId,
            id,
        } = picture;
        return {
            alias_key,
            created_at,
            deleted_at,
            html_url,
            id,
            name,
            galleryId,
        };
    }
    static toDomain(picture: PictureMayIncludeAuthor): Picture {
        const {
            alias_key: aliasKey,
            created_at: createdAt,
            deleted_at: deletedAt,
            galleryId,
            html_url: htmlUrl,
            id,
            name,
            author,
        } = picture;
        return new Picture({
            aliasKey,
            htmlUrl,
            id,
            name,
            createdAt,
            deletedAt,
            galleryId,
            author: PrismaAuthorMapper.toDomain(author),
        });
    }
}
