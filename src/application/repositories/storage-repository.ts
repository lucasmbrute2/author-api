export interface StorageProvider {
    save(file: Express.Multer.File): Promise<string>;
    delete(file: Express.Multer.File): Promise<void>;
}
