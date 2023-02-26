import { Replace } from "@helpers/Replace";
import { randomUUID } from "node:crypto";
import { Email, Name, Password } from "@modules/author/entities/validation";
import { AppError } from "../../../../shared/errors/app-error";

interface AuthorProps {
    id: string;
    name: Name;
    email: Email;
    password: Password;
    profilePicture?: string;
    bio?: string;
    createdAt: Date;
    deletedAt?: Date;
    galleryId?: string;
}

export class Author {
    constructor(private props: Replace<AuthorProps, { createdAt?: Date }>) {
        this.props = {
            ...props,
        };
        this._createdAt();
        this._galleryId();
    }

    _id() {
        if (this.props.id) throw new AppError("ID already has a value", 400);
        this.props.id = randomUUID();
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

    set profilePicture(profilePicture: string) {
        this.props.profilePicture = profilePicture;
    }

    get profilePicture(): string {
        return this.props.profilePicture;
    }

    set bio(bio: string) {
        if (bio.length < 3 || bio.length > 300) throw new Error("Invalid size");

        this.props.bio = bio;
    }

    get bio(): string {
        return this.props.bio;
    }

    _createdAt() {
        if (this.props.createdAt)
            throw new AppError("Date already has a value", 400);

        this.props.createdAt = new Date();
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    set deletedAt(deletedAt: Date) {
        this.props.deletedAt = deletedAt;
    }

    get deletedAt(): Date {
        return this.props.deletedAt;
    }

    _galleryId() {
        if (this.props.galleryId)
            throw new AppError("Already exists gallery ID", 400);

        this.props.galleryId = randomUUID();
    }

    get galleryId(): string {
        return this.props.galleryId;
    }
}
