import { RedisRepository } from "@app/repositories/redis-repository";

export class InMemoryRedisProvider implements RedisRepository {
    public redisClient = new Map();

    async connect(): Promise<void> {}
    async disconnect(): Promise<void> {}

    async setValue(key: string, value: string, expire: number): Promise<void> {
        this.redisClient.set(key, value);
    }

    async getValue(key: string): Promise<string> {
        return this.redisClient.get(key);
    }

    async delete(key: string): Promise<void> {
        this.redisClient.delete(key);
    }
}
