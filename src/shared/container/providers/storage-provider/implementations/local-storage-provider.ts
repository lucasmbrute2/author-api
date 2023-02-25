import { StorageProvider } from "@app/repositories/storage-repository";
import { AppError, NotFoundError } from "../../../../errors/app-error";
import fs from "fs";
import { resolve } from "path";
import { Picture } from "@app/modules/picture/entities/picture";
import { destination } from "../../../../../application/constraints/upload";

export class LocalStorageProvider implements StorageProvider {
    async save(file: Picture): Promise<void> {
        const { aliasKey: filename } = file;
        try {
            await fs.promises.rename(
                resolve(destination, filename),
                resolve(`${destination}/test`, filename)
            );
        } catch (error) {
            throw new NotFoundError("Image not found");
        }
    }

    async delete(file: Express.Multer.File): Promise<void> {
        const fileName = resolve(`${file.destination}/${file.filename}`);

        try {
            await fs.promises.stat(fileName);
        } catch (error) {
            throw new AppError("Fail to delete image", 400);
        }

        await fs.promises.unlink(fileName);
    }
}
