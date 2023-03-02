import { enviromentVariables } from "@app/constraints/enviroment-variables";
import { RefreshTokenRepository } from "@app/repositories/refresh-token-repository";
import { AppError } from "@shared/errors/app-error";
import dayjs from "dayjs";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { makeRefreshToken } from "../factory/make-refresh-token";
import { RedisRepository } from "@app/repositories/redis-repository";

interface RefreshTokenProps {
    accessToken: string;
    refreshToken: string;
}

@injectable()
export class RefreshTokenUseCase {
    constructor(
        @inject("RefreshTokenRepository")
        private refreshTokenRepository: RefreshTokenRepository,
        @inject("RedisRepository")
        private redisClient: RedisRepository
    ) {}

    async execute(refreshToken: string): Promise<RefreshTokenProps> {
        const { sub: user_id } = verify(
            refreshToken,
            enviromentVariables.refreshToken
        );
        const authorId = user_id as string;

        const isRefreshTokenValid =
            await this.refreshTokenRepository.findByAuthorId(authorId);

        if (!isRefreshTokenValid || isRefreshTokenValid.token !== refreshToken)
            throw new AppError("Refresh token invalid", 403);

        const { id: tokenId } = isRefreshTokenValid;
        await this.refreshTokenRepository.delete(tokenId);

        const SECONDS = 60;
        const REFRESH_TOKEN_EXPIRE_IN_HOURS = SECONDS * SECONDS * 24;
        const refreshTokenSigned = sign({}, enviromentVariables.refreshToken, {
            subject: authorId,
            expiresIn: `${REFRESH_TOKEN_EXPIRE_IN_HOURS}h`,
        });

        const refreshTokenfromFactory = makeRefreshToken(authorId, {
            expireIn: dayjs()
                .add(REFRESH_TOKEN_EXPIRE_IN_HOURS, "hours")
                .unix(),
            token: refreshTokenSigned,
        });

        const createdRefreshToken = await this.refreshTokenRepository.save(
            refreshTokenfromFactory
        );

        const TOKEN_EXPIRE_IN_HOURS = SECONDS * SECONDS * 1;
        const accessToken = sign({}, enviromentVariables.jwtTokenHash, {
            expiresIn: `${TOKEN_EXPIRE_IN_HOURS}h`,
            subject: authorId,
        });

        this.redisClient.setValue(authorId, accessToken, TOKEN_EXPIRE_IN_HOURS);

        return {
            accessToken,
            refreshToken: createdRefreshToken.token,
        };
    }
}
