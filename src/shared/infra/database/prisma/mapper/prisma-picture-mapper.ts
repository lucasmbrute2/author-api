import { Picture } from "@app/modules/picture/entities/picture";
import { Photo as pictureRaw } from "@prisma/client";

export class PrismaMapper {
    static toPrisma(picture: Picture): pictureRaw {
        const {
            aliasKey: alias_key,
            createdAt: created_at,
            deletedAt: deleted_at,
            galleryId,
            htmlUrl: html_url,
            id,
            name,
        } = picture;
        return {
            alias_key,
            created_at,
            deleted_at,
            galleryId,
            html_url,
            id,
            name,
        };
    }
}
