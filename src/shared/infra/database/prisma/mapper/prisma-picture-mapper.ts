import { Picture } from "@app/modules/picture/entities/picture";
import { Picture as pictureRaw } from "@prisma/client";

export class PrismaMapper {
    static toPrisma(picture: Picture): pictureRaw {
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
}
