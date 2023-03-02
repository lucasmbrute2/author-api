import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./refresh-token-use-case";

interface RefreshTokenControllerBody {
    refreshToken: string;
}

export class RefreshTokenController {
    async handle(
        req: Request<nonValuable, nonValuable, RefreshTokenControllerBody>,
        res: Response
    ): Promise<Response> {
        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
        const { refreshToken: refresh_token } = req.body;

        const { accessToken, refreshToken } = await refreshTokenUseCase.execute(
            refresh_token
        );

        return res.status(200).json({
            accessToken,
            refreshToken,
        });
    }
}
