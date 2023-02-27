import { inject, injectable } from "tsyringe";
import { compare, hash } from "bcryptjs";
import { Password } from "../../entities/validation";
import { AuthorRepository } from "@app/repositories/author-repository";
import {
    BadRequestError,
    NotFoundError,
    Unauthorized,
} from "@shared/errors/app-error";

interface ResetPasswordUseCaseProps {
    id: string;
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

@injectable()
export class ResetPasswordUseCase {
    constructor(
        @inject("AuthorRepository")
        private authorRepository: AuthorRepository
    ) {}

    async execute(req: ResetPasswordUseCaseProps): Promise<void> {
        const { confirmNewPassword, id, newPassword, oldPassword } = req;

        const author = await this.authorRepository.findByID(id);
        if (!author) throw new NotFoundError("Author not found");

        if (
            new Password(newPassword).value !==
            new Password(confirmNewPassword).value
        )
            throw new BadRequestError("Passwords not match");

        const isPasswordCorrect = await compare(
            oldPassword,
            author.password.value
        );

        if (!isPasswordCorrect)
            throw new Unauthorized("Email or password invalid");

        const encryptedPassword = new Password(
            await hash(newPassword, 8),
            false
        );

        await this.authorRepository.savePassword(id, encryptedPassword);
    }
}
