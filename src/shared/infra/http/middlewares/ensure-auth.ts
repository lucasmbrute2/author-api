import { enviromentVariables } from "../../../../application/constraints/enviroment-variables";
import { RedisProvider } from "../../../container/providers/RedisProvider/implementations/redis-provider";
import { Unauthorized } from "../../../../shared/errors/app-error";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

export class Authorization {
    async ensureAuth(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization;
        const redisClient = container.resolve(RedisProvider);

        try {
            const [_, token] = authHeader.split(" ");

            const { sub: user_id } = verify(
                token,
                enviromentVariables.jwtTokenHash
            );

            await redisClient.disconnect();
            await redisClient.connect();

            const isTokenAvailable = await redisClient.getValue(
                user_id as string
            );

            if (!isTokenAvailable) {
                throw new Unauthorized("Missing token");
            }

            req["user"] = user_id;
        } catch (error) {
            throw new Unauthorized("Missing token");
        }

        return next();
    }
}
