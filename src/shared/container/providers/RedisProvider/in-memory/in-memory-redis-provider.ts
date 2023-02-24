import { RedisRepository } from "@app/repositories/redis-repository";
import Redis, { RedisClient } from "redis-mock";

export class InMemoryRedisProvider implements RedisRepository {
    constructor(private redisClient: RedisClient) {
        this.redisClient = Redis.createClient();
    }

    getClient(): RedisClient {
        return this.redisClient;
    }
}
