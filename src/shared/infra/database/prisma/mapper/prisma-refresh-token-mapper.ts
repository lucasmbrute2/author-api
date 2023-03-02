import { RefreshToken } from "@app/modules/refresh-token/entities/refresh-token";
import { RefreshToken as rawRefreshToken } from "@prisma/client";

export class PrismaMapper {
    static toPrisma(refreshToken: RefreshToken): rawRefreshToken {
        const { expireIn, id, token, userId } = refreshToken;

        return {
            expire_in: expireIn,
            id,
            token,
            userId,
        };
    }

    static toDomain(raw: rawRefreshToken): RefreshToken {
        const { expire_in: expireIn, id, token, userId } = raw;

        return new RefreshToken({
            expireIn,
            id,
            token,
            userId,
        });
    }
}
