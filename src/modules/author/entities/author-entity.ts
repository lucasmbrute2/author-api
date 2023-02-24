import { Replace } from "helpers/Replace";
import { randomUUID } from "node:crypto";
import { Email, Name, Password } from "./validation";

interface AuthorProps {
    id?: string;
    name: Name;
    email: Email;
    password: Password;
    profile_picture?: string;
    bio?: string;
    created_at: Date;
    deleted_at?: Date;
    gallery_id?: string;
}

export class Author {
    constructor(private props: Replace<AuthorProps, { created_at?: Date }>) {
        this.props = {
            ...props,
            id: props.id ?? randomUUID(),
            created_at: props.created_at ?? new Date(),
        };
    }

    get id(): string {
        return this.props.id;
    }

    set email(email: Email) {
        this.props.email = email;
    }

    get email(): Email {
        return this.props.email;
    }

    set name(name: Name) {
        this.props.name = name;
    }

    get name(): Name {
        return this.props.name;
    }

    set password(password: Password) {
        this.props.password = password;
    }

    get password(): Password {
        return this.props.password;
    }

    set profile_picture(profile_picture: string) {
        this.props.profile_picture = profile_picture;
    }

    get profile_picture(): string {
        return this.props.profile_picture;
    }

    set bio(bio: string) {
        if (bio.length < 3 || bio.length > 300) throw new Error("Invalid size");

        this.props.bio = bio;
    }

    get bio(): string {
        return this.props.bio;
    }

    set created_at(created_at: Date) {
        this.props.created_at = created_at;
    }

    get created_at(): Date {
        return this.props.created_at;
    }

    set deleted_at(deleted_at: Date) {
        this.props.deleted_at = deleted_at;
    }

    get deleted_at(): Date {
        return this.props.deleted_at;
    }
    set gallery_id(gallery_id: string) {
        this.props.gallery_id = gallery_id;
    }

    get gallery_id(): string {
        return this.props.gallery_id;
    }
}
