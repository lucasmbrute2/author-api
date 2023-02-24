import { RedisRepository } from "@app/repositories/redis-repository";
import { createClient } from "redis";
import { RedisClientType } from "@redis/client";

export class RedisProvider implements RedisRepository {
    public redisClient: RedisClientType;

    constructor() {
        this.redisClient = createClient();
        this.connect();
    }

    async disconnect(): Promise<void> {
        this.redisClient.disconnect();
    }

    async connect(): Promise<void> {
        await this.redisClient.connect();
    }

    async setValue(key: string, value: string, expire: number): Promise<void> {
        await this.redisClient.set(key, value, {
            EX: expire,
            NX: true,
        });
    }

    async getValue(key: string): Promise<string> {
        return await this.redisClient.get(key);
    }
}
