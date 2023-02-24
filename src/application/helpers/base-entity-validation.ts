import { AppError } from "../../shared/errors/app-error";

export class BaseEntityValidation {
    constructor(
        private readonly input: string,
        private readonly regex: RegExp,
        private readonly shouldValidate: boolean
    ) {
        if (!input) throw new AppError("Input missing", 400);

        if (!this.shouldValidate) return;
        if (!this.isInputValid())
            throw new AppError(
                `Input ${this.input} has the wrong format.`,
                400
            );
    }

    private isInputValid(): boolean {
        return this.input.match(this.regex) !== null;
    }

    get value() {
        return this.input;
    }
}
