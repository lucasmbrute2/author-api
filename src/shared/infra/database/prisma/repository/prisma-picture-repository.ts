import { Picture } from "@app/modules/picture/entities/picture";
import { PictureRepository } from "@app/repositories/picture-repository";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { inject, injectable } from "tsyringe";
import { PrismaMapper } from "../mapper/prisma-picture-mapper";

@injectable()
export class PrismaRepositoryPicture implements PictureRepository {
    private prisma: PrismaClient;

    constructor(@inject(PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async save(picture: Picture): Promise<void> {
        const prismaPicture = PrismaMapper.toPrisma(picture);
        await this.prisma.picture.create({
            data: prismaPicture,
        });
    }

    async findByName(pictureName: string): Promise<null | Picture> {
        const picture = await this.prisma.picture.findUnique({
            where: {
                alias_key: pictureName,
            },
            include: {
                gallery: {
                    include: {
                        author: true,
                    },
                },
            },
        });

        if (!picture) return null;
        return PrismaMapper.toDomain(picture);
    }

    async delete(pictureName: string): Promise<void> {
        await this.prisma.picture.delete({
            where: {
                alias_key: pictureName,
            },
        });
    }

    async listByGalleryId(page: number, galleryId: string): Promise<Picture[]> {
        const NUMBERS_OF_PICTURES_TO_DISPLAY = 6;
        const skip = (page - 1) * NUMBERS_OF_PICTURES_TO_DISPLAY;

        const pictures = await this.prisma.picture.findMany({
            where: {
                NOT: {
                    deleted_at: {
                        not: null,
                    },
                },
                galleryId,
            },
            skip,
            take: NUMBERS_OF_PICTURES_TO_DISPLAY,
            orderBy: {
                created_at: "desc",
            },
            include: {
                gallery: true,
            },
        });

        return pictures.map(PrismaMapper.toDomain);
    }

    async softDelete(pictureName: string): Promise<Picture> {
        const picture = await this.prisma.picture.update({
            where: {
                alias_key: pictureName,
            },
            data: {
                deleted_at: new Date(),
            },
            include: {
                gallery: true,
            },
        });

        return PrismaMapper.toDomain(picture);
    }

    async list(page: number): Promise<Picture[]> {
        const NUMBERS_OF_PICTURES_TO_DISPLAY = 6;
        const skip = (page - 1) * NUMBERS_OF_PICTURES_TO_DISPLAY;

        const pictures = await this.prisma.picture.findMany({
            where: {
                NOT: {
                    deleted_at: {
                        not: null,
                    },
                },
            },
            skip,
            take: NUMBERS_OF_PICTURES_TO_DISPLAY,
            orderBy: {
                created_at: "asc",
            },
            include: {
                gallery: true,
            },
        });

        return pictures.map(PrismaMapper.toDomain);
    }
}
