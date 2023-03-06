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
        const { jwt: refreshToken } = req.cookies;

        const { token, refresh_token } = await authAuthorUseCase.execute({
            email,
            password,
            refreshToken,
        });

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });

        res.cookie("jwt", refresh_token, {
            httpOnly: true,
            sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000,
            secure: true,
        });

        return res.status(200).json({
            token,
            status: "success",
        });
    }
}
