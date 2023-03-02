import { RedisRepository } from "@app/repositories/redis-repository";
import { injectable } from "tsyringe";
import { enviromentVariables } from "@app/constraints/enviroment-variables";
import Redis from "ioredis";

@injectable()
export class RedisProvider implements RedisRepository {
    public redisClient: Redis;

    constructor() {
        const { host, password, port, username } = enviromentVariables.redis;
        this.redisClient = new Redis({
            port: +port,
            host,
            username,
            password,
        });
    }

    async disconnect(): Promise<void> {
        this.redisClient.disconnect();
    }

    async connect(): Promise<void> {
        await this.redisClient.connect();
    }

    async setValue(key: string, value: string, expire: number): Promise<void> {
        await this.redisClient.set(key, value, "EX", expire);
    }

    async getValue(key: string): Promise<string> {
        return await this.redisClient.get(key);
    }

    async delete(key: string): Promise<void> {
        await this.redisClient.del(key);
    }
}
