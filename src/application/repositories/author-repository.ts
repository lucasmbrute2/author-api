import { Email, Password } from "@app/modules/author/entities/validation";
import { Author } from "../modules/author/entities/author-entity";

export interface EditProfileProps {
    name?: string;
    profile_picture?: string;
    bio?: string;
}

export interface AuthorRepository {
    create(data: Author): Promise<void>;
    findByEmail(email: Email): Promise<Author | null>;
    saveProfile(id: string, data: EditProfileProps): Promise<Author>;
    findByID(id: string): Promise<Author | null>;
    savePassword(id: string, newPassword: Password): Promise<void>;
}
