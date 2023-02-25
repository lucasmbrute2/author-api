import { Picture } from "../entities/picture";

type OverridePicture = Partial<Express.Multer.File>;

export function makePicture(file: OverridePicture, galleryId: string): Picture {
    const { originalname, path, filename } = file;
    return new Picture({
        galleryId: galleryId || "",
        aliasKey: filename,
        htmlUrl: path,
        name: originalname,
    });
}
