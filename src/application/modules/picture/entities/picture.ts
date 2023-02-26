import { randomUUID } from "crypto";

interface PictureProps {
    id: string;
    htmlUrl: string;
    name: string;
    aliasKey: string;
    createdAt?: Date;
    deletedAt?: Date;
    galleryId?: string;
}

export class Picture {
    constructor(private props: PictureProps) {
        this.props = props;
        this._galleryId();
        this._createdAt();
    }

    _id(): string {
        if (this.props.id) return;
        return (this.props.id = randomUUID());
    }

    get id(): string {
        return this.props.id;
    }

    get htmlUrl(): string {
        return this.props.htmlUrl;
    }

    set htmlUrl(htmlUrl: string) {
        this.props.htmlUrl = htmlUrl;
    }

    get name(): string {
        return this.props.name;
    }

    set name(name: string) {
        this.props.name = name;
    }

    get aliasKey(): string {
        return this.props.aliasKey;
    }

    set aliasKey(aliasKey: string) {
        this.props.aliasKey = aliasKey;
    }

    get createdAt(): Date {
        return this.props.createdAt;
    }

    _createdAt() {
        if (this.props.createdAt) return;
        this.props.createdAt = new Date();
    }

    set deletedAt(deletedAt: Date) {
        this.props.deletedAt = deletedAt;
    }
    get deletedAt(): Date {
        return this.props.deletedAt;
    }

    get galleryId(): string {
        return this.props.galleryId;
    }

    _galleryId() {
        if (this.props.galleryId) return;
        this.props.galleryId = randomUUID();
    }
}
