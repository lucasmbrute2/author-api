import { Author } from "@app/modules/author/entities/author-entity";
import { Email } from "@app/modules/author/entities/validation";
import {
    AuthorRepository,
    EditProfileProps,
} from "@app/repositories/author-repository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { PrismaMapper } from "../mapper/prisma-mapper";

@injectable()
export class PrismaRepositoryAuthor implements AuthorRepository {
    private prisma: PrismaClient;

    constructor(@inject(PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async create(data: Author): Promise<void> {
        await this.prisma.author.create({
            data: PrismaMapper.toPrisma(data),
        });
    }

    async findByEmail(email: Email): Promise<Author | null> {
        const author = await this.prisma.author.findUnique({
            where: {
                username: email.value,
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
        });

        if (!author) return null;

        return PrismaMapper.toDomain(author);
    }
}