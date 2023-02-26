import { PictureRepository } from "../../../repositories/picture-repository";
import { Picture } from "../entities/picture";

interface Gallery {
    id: string;
    authorId: string;
}

export class InMemoryPictureRepository implements PictureRepository {
    public pictures: Picture[] = [];
    public gallery: Gallery[];

    async save(picture: Picture, authorId: string): Promise<void> {
        this.pictures.push(picture);
        this.gallery.push({ id: picture.galleryId, authorId });
    }

    async findByName(pictureName: string): Promise<void | Picture> {
        throw new Error("Method not implemented.");
    }

    async delete(pictureName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async getByGalleryId(page: number, take: number): Promise<Picture[]> {
        throw new Error("Method not implemented.");
    }
}
