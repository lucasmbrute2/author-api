import { Author } from "@app/modules/author/entities/author-entity";
import { Picture } from "../modules/picture/entities/picture";

interface PictureViewModelProps {
    name: string;
    htmlUrl: string;
    aliasKey: string;
    id: string;
    createdAt: Date;
    galleryId: string;
    deletedAt: Date;
}

export class PictureViewModel {
    static toHTTP(file: Picture): PictureViewModelProps {
        const { aliasKey, createdAt, galleryId, id, name, htmlUrl, deletedAt } =
            file;
        return {
            name,
            aliasKey,
            htmlUrl,
            createdAt,
            galleryId,
            id,
            deletedAt,
        };
    }
}
