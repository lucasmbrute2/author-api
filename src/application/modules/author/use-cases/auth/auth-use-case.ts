import { AuthorRepository } from "../../../../repositories/author-repository";
import {
    BadRequestError,
    NotFoundError,
} from "../../../../../shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { Email } from "../../entities/validation";
import { sign } from "jsonwebtoken";
import { enviromentVariables } from "../../../../constraints/enviroment-variables";
import { RedisRepository } from "../../../../repositories/redis-repository";

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

        const token = sign({}, enviromentVariables.jwtTokenHash, {
            subject: isAuthorExistent.id,
        });

        await this.redisClient.disconnect(); //refac
        await this.redisClient.connect();

        const SECONDS = 60;
        const TOKEN_EXPIRE_IN_HOURS = SECONDS * SECONDS * 1;

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
