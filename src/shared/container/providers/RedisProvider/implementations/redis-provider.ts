import { RedisRepository } from "@app/repositories/redis-repository";
import { Redis } from "ioredis";

export class RedisProvider implements RedisRepository {
    private redisClient: Redis;
    constructor() {
        this.redisClient = new Redis({
            host: process.env.REDIS_HOST,
            port: Number(process.env.REDIS_PORT),
            db: 0,
        });
    }

    getClient(): Redis {
        return this.redisClient;
    }
}
