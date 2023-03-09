import { Author } from "@app/modules/author/entities/author-entity";
import { Email, Password } from "@app/modules/author/entities/validation";
import {
    AuthorRepository,
    EditProfileProps,
} from "@app/repositories/author-repository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { PrismaMapper } from "../mapper/prisma-author-mapper";

@injectable()
export class PrismaRepositoryAuthor implements AuthorRepository {
    private prisma: PrismaClient;

    constructor(@inject(PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(data: Author): Promise<void> {
        const { galleryId, ...rest } = PrismaMapper.toPrisma(data);

        await this.prisma.author.create({
            data: {
                gallery: {
                    create: {
                        id: galleryId,
                    },
                },
                ...rest,
            },
        });
    }

    async findByEmail(email: Email): Promise<Author | null> {
        const author = await this.prisma.author.findUnique({
            where: {
                username: email.value,
            },
            include: {
                refresh_token: true,
            },
        });

        if (!author) return null;
        return PrismaMapper.toDomain(author);
    }

    async saveProfile(id: string, data: EditProfileProps): Promise<Author> {
        const author = await this.prisma.author.update({
            where: {
                id,
            },
            data,
        });

        return PrismaMapper.toDomain(author);
    }

    async findByID(id: string): Promise<Author | null> {
        const author = await this.prisma.author.findUnique({
            where: {
                id,
            },
            include: {
                refresh_token: true,
            },
        });

        if (!author) return null;

        return PrismaMapper.toDomain(author);
    }

    async savePassword(id: string, newPassword: Password): Promise<void> {
        await this.prisma.author.update({
            where: {
                id,
            },
            data: {
                password: newPassword.value,
            },
        });
    }
}
