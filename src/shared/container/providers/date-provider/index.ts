import { DateRepository } from "@app/repositories/date-repository";
import { container } from "tsyringe";
import { DayjsRepository } from "./implementations/dayjs-repository";

container.registerSingleton<DateRepository>("DateRepository", DayjsRepository);
