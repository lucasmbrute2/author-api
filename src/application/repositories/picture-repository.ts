import { Picture } from "@app/modules/picture/entities/picture";

export interface PictureRepository {
    save(picture: Picture, authorId?: string): Promise<void>;
}
