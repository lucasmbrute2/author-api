import { Author } from "@app/modules/author/entities/author-entity";

interface AuthorViewlModelProps {
    name: string;
    email: string;
}

export class AuthorViewlModel {
    static toHTTP(author: Author): AuthorViewlModelProps {
        return {
            email: author.email.value,
            name: author.name.value,
        };
    }
}
