import { enviromentVariables } from "@app/constraints/enviroment-variables";
import { RefreshTokenRepository } from "@app/repositories/refresh-token-repository";
import { AppError } from "@shared/errors/app-error";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { makeRefreshToken } from "../factory/make-refresh-token";
import { RedisRepository } from "@app/repositories/redis-repository";
import { DateRepository } from "@app/repositories/date-repository";
import {
    AccessTokenExpiration,
    RefreshTokenExpiration,
} from "@app/helpers/token-expiration-time";

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
        private redisClient: RedisRepository,
        @inject("DateRepository")
        private dateRepository: DateRepository
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

        await this.refreshTokenRepository.delete(authorId);

        const refreshTokenExpiration =
            new RefreshTokenExpiration().getTokenExpirationHours();
        const refreshTokenSigned = sign({}, enviromentVariables.refreshToken, {
            subject: authorId,
            expiresIn: `${refreshTokenExpiration}h`,
        });

        const expireIn = this.dateRepository.addHours(refreshTokenExpiration);
        const refreshTokenfromFactory = makeRefreshToken(authorId, {
            expireIn,
            token: refreshTokenSigned,
        });

        const createdRefreshToken = await this.refreshTokenRepository.save(
            refreshTokenfromFactory
        );

        const accessTokenExpiration =
            new RefreshTokenExpiration().getTokenExpirationHours();
        const accessToken = sign({}, enviromentVariables.jwtTokenHash, {
            expiresIn: `${accessTokenExpiration}h`,
            subject: authorId,
        });

        this.redisClient.setValue(
            authorId,
            accessToken,
            refreshTokenExpiration
        );

        return {
            accessToken,
            refreshToken: createdRefreshToken.token,
        };
    }
}
