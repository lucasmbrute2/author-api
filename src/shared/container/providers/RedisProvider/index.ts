import { RedisRepository } from "@app/repositories/redis-repository";
import { container } from "tsyringe";
import { RedisProvider } from "./implementations/redis-provider";
import { InMemoryRedisProvider } from "./in-memory/in-memory-redis-provider";

const redisProiver = {
    production: container.resolve(RedisProvider),
    local: container.resolve(InMemoryRedisProvider),
};

container.registerSingleton<RedisRepository>(
    "RedisRepository",
    redisProiver[process.env.REDIS_ENVIRONMENT]
);
