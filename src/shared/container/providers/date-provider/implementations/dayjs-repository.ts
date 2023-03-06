import { DateRepository } from "@app/repositories/date-repository";
import dayjs from "dayjs";

export class DayjsRepository implements DateRepository {
    addHours(hours: number): number {
        return dayjs().add(hours, "hours").unix();
    }
}
