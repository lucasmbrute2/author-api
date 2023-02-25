import { Author } from "@app/modules/author/entities/author-entity";

interface AuthorViewlModelProps {
    name: string;
    email: string;
    id: string;
    bio: string;
}

export class AuthorViewlModel {
    static toHTTP(author: Author): AuthorViewlModelProps {
        const {
            email: { value: emailValue },
            name: { value: nameValue },
            id,
            bio,
        } = author;
        return {
            email: emailValue,
            name: nameValue,
            id,
            bio,
        };
    }
}
