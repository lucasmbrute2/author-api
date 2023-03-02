import { Request, Response } from "express";
import { container } from "tsyringe";
import { LogoutUseCase } from "./logout-use-case";

export class LogoutController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        const logoutUseCase = container.resolve(LogoutUseCase);

        await logoutUseCase.execute(id);
        return res.status(200).json({
            status: "success",
        });
    }
}
