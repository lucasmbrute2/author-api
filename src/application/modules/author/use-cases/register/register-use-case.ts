import "reflect-metadata";
import { Author } from "../../entities/author-entity";
import { Email, Name, Password } from "../../entities/validation";
import { makeAuthor } from "../../factory/makeAuthor";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { AuthorRepository } from "@app/repositories/author-repository";
import { RedisRepository } from "@app/repositories/redis-repository";
import { BadRequestError } from "@shared/errors/app-error";
import { enviromentVariables } from "@app/constraints/enviroment-variables";
import { RefreshTokenRepository } from "@app/repositories/refresh-token-repository";
import { makeRefreshToken } from "@app/modules/refresh-token/factory/make-refresh-token";
import dayjs from "dayjs";

export interface RegisterAuthorRepositoryRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterAuthorRepositoryResponse {
    author: Author;
    token: string;
    refreshToken: string;
}

@injectable()
export class RegisterAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository,
        @inject("RedisRepository")
        private redisClient: RedisRepository,
        @inject("RefreshTokenRepository")
        private refreshTokenRepository: RefreshTokenRepository
    ) {}

    async execute(
        request: RegisterAuthorRepositoryRequest
    ): Promise<RegisterAuthorRepositoryResponse> {
        const { email, name, password, confirmPassword } = request;

        if (password !== confirmPassword)
            throw new BadRequestError("The passwords do not match");

        const validatedEmail = new Email(email);

        const authorAlreadyCreated = await this.authorRepository.findByEmail(
            validatedEmail
        );

        if (authorAlreadyCreated)
            throw new BadRequestError("User or password invalid");

        const author = makeAuthor({
            name: new Name(name),
            email: validatedEmail,
            password: new Password(password),
        });

        const SECONDS = 60;
        const TOKEN_EXPIRE_IN_HOURS = SECONDS * SECONDS * 1;
        const token = sign({}, enviromentVariables.jwtTokenHash, {
            expiresIn: TOKEN_EXPIRE_IN_HOURS,
            subject: author.id,
        });

        const REFRESH_TOKEN_EXPIRE_IN_HOURS = SECONDS * SECONDS * 24;
        const refreshToken = sign({}, enviromentVariables.refreshToken, {
            subject: author.id,
            expiresIn: REFRESH_TOKEN_EXPIRE_IN_HOURS,
        });

        const refreshTokenfromFactory = makeRefreshToken(author.id, {
            expireIn: dayjs()
                .add(REFRESH_TOKEN_EXPIRE_IN_HOURS, "hours")
                .unix(),
            token: refreshToken,
        });

        const incryptedPassword = await hash(password, 8);
        author.password = new Password(incryptedPassword, false);

        await this.authorRepository.create(author);
        const createdRefreshToken = await this.refreshTokenRepository.save(
            refreshTokenfromFactory
        );

        this.redisClient
            .setValue(author.id, token, TOKEN_EXPIRE_IN_HOURS)
            .then(console.log);

        return {
            author,
            token,
            refreshToken: createdRefreshToken.token,
        };
    }
}
