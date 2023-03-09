import { Picture } from "@app/modules/picture/entities/picture";
import { Gallery as RawGallery, Picture as PictureRaw } from "@prisma/client";

interface IGallery {
    gallery: RawGallery;
}

type PictureMayIncludeGallery = PictureRaw & Partial<IGallery>;

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
    static toDomain(picture: PictureMayIncludeGallery): Picture {
        const {
            alias_key: aliasKey,
            created_at: createdAt,
            deleted_at: deletedAt,
            galleryId,
            html_url: htmlUrl,
            id,
            name,
            gallery,
        } = picture;
        return new Picture({
            aliasKey,
            htmlUrl,
            id,
            name,
            createdAt,
            deletedAt,
            galleryId,
            gallery,
        });
    }
}
