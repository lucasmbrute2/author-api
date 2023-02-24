import "reflect-metadata";
import { AuthorRepository } from "../../../repositories/author-repository";
import {
    BadRequestError,
    NotFoundError,
} from "../../../../shared/errors/app-error";
import { inject, injectable } from "tsyringe";
import { Email } from "../entities/validation";
import { sign } from "jsonwebtoken";
import { enviromentVariables } from "../../../constraints/enviroment-variables";

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
        private authorRepository: AuthorRepository
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
            subject: JSON.stringify(isAuthorExistent.id),
        });

        return {
            token,
        };
    }
}
