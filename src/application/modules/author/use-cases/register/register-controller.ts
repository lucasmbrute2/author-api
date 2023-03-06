import { AuthorViewlModel } from "@app/views/author-view-model";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RegisterAuthorUseCase } from "./register-use-case";

interface RegisterAuthorControllerRequest {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export class RegisterAuthorController {
    async handle(
        req: Request<nonValuable, nonValuable, RegisterAuthorControllerRequest>,
        res: Response
    ): Promise<Response> {
        const registerAuthorUseCase = container.resolve(RegisterAuthorUseCase);

        const { confirmPassword, email, name, password } = req.body;

        const { author, token, refreshToken } =
            await registerAuthorUseCase.execute({
                confirmPassword,
                email,
                name,
                password,
            });

        return res
            .status(201)
            .cookie("jwt", refreshToken, {
                httpOnly: true,
                sameSite: "none",
                maxAge: 24 * 60 * 60 * 1000,
                secure: true,
            })
            .json({
                author: AuthorViewlModel.toHTTP(author),
                token,
                status: "success",
            });
    }
}
