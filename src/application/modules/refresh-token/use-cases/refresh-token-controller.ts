import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./refresh-token-use-case";

export class RefreshTokenController {
    async handle(req: Request, res: Response): Promise<Response> {
        const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
        const { jwt: refresh_token } = req.cookies;

        const { accessToken, refreshToken } = await refreshTokenUseCase.execute(
            refresh_token
        );

        res.clearCookie("jwt", {
            httpOnly: true,
            sameSite: "none",
            secure: true,
        });

        res.cookie("jwt", refreshToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            accessToken,
        });
    }
}
