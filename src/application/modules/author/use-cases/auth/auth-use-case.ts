import { inject, injectable } from "tsyringe";
import { Email } from "../../entities/validation";
import { sign, verify } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AuthorRepository } from "@app/repositories/author-repository";
import { RedisRepository } from "@app/repositories/redis-repository";
import {
    AppError,
    NotFoundError,
    Unauthorized,
} from "@shared/errors/app-error";
import { enviromentVariables } from "@app/constraints/enviroment-variables";
import { makeRefreshToken } from "@app/modules/refresh-token/factory/make-refresh-token";
import { DateRepository } from "@app/repositories/date-repository";
import { RefreshTokenRepository } from "@app/repositories/refresh-token-repository";
import {
    AccessTokenExpiration,
    RefreshTokenExpiration,
} from "@app/helpers/token-expiration-time";

interface AuthAuthorUseCaseProps {
    email: string;
    password: string;
    refreshToken: string;
}

interface AuthAuthorUseCaseResponse {
    token: string;
    refresh_token: string;
}

@injectable()
export class AuthAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository,
        @inject("RedisRepository")
        private redisClient: RedisRepository,
        @inject("DateRepository")
        private dateRepository: DateRepository,
        @inject("RefreshTokenRepository")
        private refreshTokenRepository: RefreshTokenRepository
    ) {}

    async execute(
        req: AuthAuthorUseCaseProps
    ): Promise<AuthAuthorUseCaseResponse> {
        const email = new Email(req.email);
        const isAuthorExistent = await this.authorRepository.findByEmail(email);

        if (!isAuthorExistent) throw new NotFoundError("Author not found");

        const isPasswordCorrect = await compare(
            req.password,
            isAuthorExistent.password.value
        );

        if (!isPasswordCorrect)
            throw new Unauthorized("Email or password incorrect");

        if (isAuthorExistent.refreshToken !== req.refreshToken)
            throw new AppError("Refresh token invalid", 403);

        await this.refreshTokenRepository.delete(isAuthorExistent.id);

        const accessTokenExpiration =
            new AccessTokenExpiration().getTokenExpirationHours();
        const token = sign({}, enviromentVariables.jwtTokenHash, {
            subject: isAuthorExistent.id,
            expiresIn: `${accessTokenExpiration}h`,
        });

        const refreshTokenExpiration =
            new RefreshTokenExpiration().getTokenExpirationHours();
        const refreshToken = sign({}, enviromentVariables.refreshToken, {
            subject: isAuthorExistent.id,
            expiresIn: `${refreshTokenExpiration}h`,
        });

        const expireIn = this.dateRepository.addHours(refreshTokenExpiration);
        const refreshTokenfromFactory = makeRefreshToken(isAuthorExistent.id, {
            expireIn,
            token: refreshToken,
        });

        const { token: refresh_token } = await this.refreshTokenRepository.save(
            refreshTokenfromFactory
        );

        await this.redisClient.setValue(
            isAuthorExistent.id,
            token,
            accessTokenExpiration
        );

        return {
            token,
            refresh_token,
        };
    }
}
