import { PictureRepository } from "@app/repositories/picture-repository";
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
}
