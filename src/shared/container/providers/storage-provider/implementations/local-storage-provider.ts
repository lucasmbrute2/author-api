import { StorageProvider } from "@app/repositories/storage-repository";
import { AppError } from "../../../../errors/app-error";
import fs from "fs";
import { resolve } from "path";

export class LocalStorageProvider implements StorageProvider {
    async save(file: Express.Multer.File): Promise<string> {
        return "";
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
