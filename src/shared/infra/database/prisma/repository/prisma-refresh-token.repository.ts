import { RefreshToken } from "@app/modules/refresh-token/entities/refresh-token";
import { RefreshTokenRepository } from "@app/repositories/refresh-token-repository";
import { PrismaClient } from "@prisma/client";
import { inject } from "tsyringe";
import { PrismaMapper } from "../mapper/prisma-refresh-token-mapper";

export class PrismaRefreshTokenRepository implements RefreshTokenRepository {
    private prisma: PrismaClient;
    constructor(
        @inject("PrismaClient")
        prisma: PrismaClient
    ) {
        this.prisma = prisma;
    }

    async save(refreshToken: RefreshToken): Promise<RefreshToken> {
        const refreshTokenMapped = PrismaMapper.toPrisma(refreshToken);
        const { userId, id, expire_in, token } = refreshTokenMapped;

        const rawRefreshToken = await this.prisma.refreshToken.upsert({
            where: {
                id,
                userId,
            },
            update: {
                expire_in,
                token,
            },
            create: refreshTokenMapped,
        });

        return PrismaMapper.toDomain(rawRefreshToken);
    }

    async delete(refreshToken: string, userId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
