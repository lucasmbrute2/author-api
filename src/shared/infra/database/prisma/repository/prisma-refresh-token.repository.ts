import { RefreshToken } from "@app/modules/refresh-token/entities/refresh-token";
import { RefreshTokenRepository } from "@app/repositories/refresh-token-repository";
import { PrismaClient } from "@prisma/client";
import { inject, injectable } from "tsyringe";
import { PrismaMapper } from "../mapper/prisma-refresh-token-mapper";

@injectable()
export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
    private prisma: PrismaClient;
    constructor(
        @inject(PrismaClient)
        prisma: PrismaClient
    ) {
        this.prisma = prisma;
    }
    async save(refreshToken: RefreshToken): Promise<RefreshToken> {
        const refreshTokenMapped = PrismaMapper.toPrisma(refreshToken);

        const rawRefreshToken = await this.prisma.refreshToken.create({
            data: refreshTokenMapped,
        });

        return PrismaMapper.toDomain(rawRefreshToken);
    }

    async delete(authorId: string): Promise<void> {
        await this.prisma.refreshToken.delete({
            where: {
                userId: authorId,
            },
        });
    }

    async findByAuthorId(authorId: string): Promise<RefreshToken> {
        const refreshToken = await this.prisma.refreshToken.findUnique({
            where: {
                userId: authorId,
            },
        });

        return PrismaMapper.toDomain(refreshToken);
    }
}
