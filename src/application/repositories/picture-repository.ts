import { Picture } from "../modules/picture/entities/picture";

export interface PictureRepository {
    save(picture: Picture, authorId?: string): Promise<void>;
    findByName(pictureName: string): Promise<Picture | void>;
    delete(pictureName: string): Promise<void>;
    getByGalleryId(page: number, galleryId: string): Promise<Picture[]>;
}
