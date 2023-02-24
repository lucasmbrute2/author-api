import { RedisRepository } from "@app/repositories/redis-repository";
import { container } from "tsyringe";
import { RedisProvider } from "./implementations/redis-provider";

container.registerSingleton<RedisRepository>("RedisRepository", RedisProvider);
