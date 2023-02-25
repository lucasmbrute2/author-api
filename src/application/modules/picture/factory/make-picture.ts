import { Picture } from "../entities/picture";

type OverridePicture = Partial<Express.Multer.File>;

export function makePicture(file: OverridePicture): Picture {
    const { originalname, path, filename } = file;
    return new Picture({
        aliasKey: filename,
        htmlUrl: path,
        name: originalname,
    });
}
