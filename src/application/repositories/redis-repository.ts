import Redis from "ioredis";
import { RedisClient } from "redis-mock";

export interface RedisRepository {
    getClient(): Redis | RedisClient;
}
