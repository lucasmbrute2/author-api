import { inject, injectable } from "tsyringe";
import { Email } from "../../entities/validation";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AuthorRepository } from "@app/repositories/author-repository";
import { RedisRepository } from "@app/repositories/redis-repository";
import { BadRequestError, NotFoundError } from "@shared/errors/app-error";
import { enviromentVariables } from "@app/constraints/enviroment-variables";

interface AuthAuthorUseCaseProps {
    email: string;
    password: string;
    confirmPassword: string;
}

interface AuthAuthorUseCaseResponse {
    token: string;
}

@injectable()
export class AuthAuthorUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository,
        @inject("RedisRepository")
        private redisClient: RedisRepository
    ) {}

    async execute(
        req: AuthAuthorUseCaseProps
    ): Promise<AuthAuthorUseCaseResponse> {
        if (req.password !== req.confirmPassword)
            throw new BadRequestError("Password do not match");

        const email = new Email(req.email);
        const isAuthorExistent = await this.authorRepository.findByEmail(email);

        if (!isAuthorExistent) throw new NotFoundError("Author not found");

        const isPasswordCorrect = await compare(
            req.password,
            isAuthorExistent.password.value
        );

        if (!isPasswordCorrect)
            throw new BadRequestError("Email or password incorrect");

        const SECONDS = 60;
        const TOKEN_EXPIRE_IN_HOURS = SECONDS * SECONDS * 168;
        const token = sign({}, enviromentVariables.jwtTokenHash, {
            subject: isAuthorExistent.id,
            expiresIn: TOKEN_EXPIRE_IN_HOURS,
        });

        await this.redisClient.setValue(
            isAuthorExistent.id,
            token,
            TOKEN_EXPIRE_IN_HOURS
        );

        return {
            token,
        };
    }
}
