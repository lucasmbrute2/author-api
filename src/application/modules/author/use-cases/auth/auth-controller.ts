import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthAuthorUseCase } from "./auth-use-case";

interface AuthAuthorControllerProps {
    email: string;
    password: string;
}

export class AuthAuthorController {
    async handle(
        req: Request<nonValuable, nonValuable, AuthAuthorControllerProps>,
        res: Response
    ): Promise<Response> {
        const { email, password } = req.body;

        const authAuthorUseCase = container.resolve(AuthAuthorUseCase);

        const { token } = await authAuthorUseCase.execute({
            email,
            password,
        });

        return res.status(200).json({
            token,
            status: "success",
        });
    }
}
