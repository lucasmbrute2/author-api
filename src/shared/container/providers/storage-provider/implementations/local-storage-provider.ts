import { Picture } from "@app/modules/picture/entities/picture";
import { StorageProvider } from "@app/repositories/storage-repository";
import { AppError } from "@shared/errors/app-error";
import fs from "fs";
import { resolve } from "path";

export class LocalStorageProvider implements StorageProvider {
    async save(file: Picture): Promise<void> {}

    async delete(fileKey: string): Promise<void> {
        const fileName = resolve(fileKey);

        try {
            await fs.promises.stat(fileName);
        } catch (error) {
            throw new AppError("Fail to delete image", 400);
        }

        await fs.promises.unlink(fileName);
    }
}
