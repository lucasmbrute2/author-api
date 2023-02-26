import { Picture } from "@app/modules/picture/entities/picture";
import { PictureRepository } from "@app/repositories/picture-repository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { PrismaMapper } from "../mapper/prisma-picture-mapper";

@injectable()
export class PrismaRepositoryPicture implements PictureRepository {
    private prisma: PrismaClient;

    constructor(@inject(PrismaClient) prisma: PrismaClient) {
        this.prisma = prisma;
    }

    async save(picture: Picture, authorId: string): Promise<void> {
        const prismaPicture = PrismaMapper.toPrisma(picture);
        const {
            alias_key,
            created_at,
            deleted_at,
            galleryId,
            html_url,
            id,
            name,
        } = prismaPicture;

        await this.prisma.photo.create({
            data: {
                alias_key,
                created_at,
                html_url,
                id,
                name,
                deleted_at,
                gallery: {
                    connectOrCreate: {
                        where: {
                            id: galleryId,
                        },
                        create: {
                            id: galleryId,
                            authorId: authorId,
                        },
                    },
                },
            },
        });
    }
}
