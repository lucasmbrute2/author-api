import { Picture } from "../modules/picture/entities/picture";

export interface PictureRepository {
    listByGalleryId(page: number, galleryId: string): Promise<Picture[]>;
    findByName(pictureName: string): Promise<Picture | void>;
    save(picture: Picture, authorId?: string): Promise<void>;
    delete(pictureName: string): Promise<void>;
    softDelete(pictureName: string): Promise<Picture>;
    list(page: number): Promise<Picture[]>;
}
