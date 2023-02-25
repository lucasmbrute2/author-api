import { Request, Response } from "express";
import { container } from "tsyringe";
import { ResetPasswordUseCase } from "./reset-password-use-case";

interface ResetPasswordControllerProps {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

export class ResetPasswordController {
    async handle(
        req: Request<nonValuable, nonValuable, ResetPasswordControllerProps>,
        res: Response
    ): Promise<Response> {
        const resetPasswordUseCase = container.resolve(ResetPasswordUseCase);
        const { confirmNewPassword, newPassword, oldPassword } = req.body;
        const { id } = req.userID;

        await resetPasswordUseCase.execute({
            id,
            confirmNewPassword,
            newPassword,
            oldPassword,
        });

        return res.status(200).send();
    }
}
