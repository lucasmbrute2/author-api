import { Author } from "@app/modules/author/entities/author-entity";

interface AuthorViewlModelProps {
    name: string;
    email: string;
    id: string;
    bio: string;
    createdAt: Date;
    galleryId: string;
    profilePicture: string;
}

export class AuthorViewlModel {
    static toHTTP(author: Author): AuthorViewlModelProps {
        const {
            email: { value: emailValue },
            name: { value: nameValue },
            id,
            bio,
            createdAt,
            galleryId,
            profilePicture,
        } = author;
        return {
            email: emailValue,
            name: nameValue,
            id,
            bio,
            createdAt,
            galleryId,
            profilePicture,
        };
    }
}
