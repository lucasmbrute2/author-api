import { Picture } from "../modules/picture/entities/picture";

export interface StorageProvider {
    save(file: Picture): Promise<void>;
    delete(fileKey: string): Promise<void>;
}
