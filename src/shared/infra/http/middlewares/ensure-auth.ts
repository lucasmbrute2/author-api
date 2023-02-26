import { enviromentVariables } from "../../../../application/constraints/enviroment-variables";
import { Unauthorized } from "../../../../shared/errors/app-error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";
import { RedisProvider } from "../../../../shared/container/providers/redis-provider/implementations/redis-provider";

export class Authorization {
    async ensureAuth(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        const redisClient = container.resolve(RedisProvider);

        try {
            await redisClient.disconnect();
            const [_, token] = authHeader.split(" ");

            const { sub: user_id } = verify(
                token,
                enviromentVariables.jwtTokenHash
            );

            await redisClient.connect();

            const isTokenAvailable = await redisClient.getValue(
                user_id as string
            );

            req.userID = {
                id: user_id as string,
            };
            if (!isTokenAvailable) {
                throw new Unauthorized("Missing token");
            }
        } catch (error) {
            throw new Unauthorized("Missing token");
        }

        return next();
    }
}
