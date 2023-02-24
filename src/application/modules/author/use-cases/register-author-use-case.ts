import { AuthorRepository } from "@app/repositories/author-repository";
import { Author } from "../entities/author-entity";
import { Email, Name, Password } from "../entities/validation";
import { makeAuthor } from "../factory/makeAuthor";
import { createClient } from "redis";
import jwtr from "jwt-redis";
import { hash } from "bcrypt";

export interface RegisterAuthorRepositoryRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

interface RegisterAuthorRepositoryResponse {
    author: Author;
    token: string;
}

export class RegisterAuthorUseCase {
    constructor(
        private authorRepository: AuthorRepository,
        private redisClient: any
    ) {
        this.redisClient = createClient();
    }

    async execute(
        request: RegisterAuthorRepositoryRequest
    ): Promise<RegisterAuthorRepositoryResponse> {
        const redisClient = await this.redisClient.connect();
        const { sign } = new jwtr(redisClient);

        const { email, name, password, confirmPassword } = request;

        if (password !== confirmPassword)
            throw new Error("The passwords are not the same");

        const validatedEmail = new Email(email);
        const userAlreadyCreated = await this.authorRepository.findByEmail(
            validatedEmail
        );

        if (userAlreadyCreated) throw new Error("User or password invalid");

        const author = makeAuthor({
            name: new Name(name),
            email: validatedEmail,
            password: new Password(password),
        });

        const jti = { jti: "jti-test" };
        const token = await sign(jti, "test-secret", {
            expiresIn: "1d",
        });

        const incryptedPassword = await hash(password, 8);
        author.password = new Password(incryptedPassword, false);

        await this.authorRepository.create(author);

        return {
            author,
            token,
        };
    }
}
