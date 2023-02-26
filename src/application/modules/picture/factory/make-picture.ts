import { randomUUID } from "crypto";
import { Picture } from "../entities/picture";

type OverridePicture = Partial<Express.Multer.File> & Partial<Picture>;

export function makePicture(
    file?: OverridePicture,
    galleryId?: string
): Picture {
    return new Picture({
        id: randomUUID(),
        galleryId: galleryId || randomUUID(),
        aliasKey: file?.filename,
        htmlUrl: file?.path,
        name: file?.originalname,
    });
}
