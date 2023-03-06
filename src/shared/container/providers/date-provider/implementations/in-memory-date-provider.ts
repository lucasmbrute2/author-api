import { DateRepository } from "@app/repositories/date-repository";

export class InMemoryDateProvider implements DateRepository {
    addHours(hours: number): number {
        const actualDate = new Date();
        return actualDate.setHours(actualDate.getHours() + hours);
    }
}
