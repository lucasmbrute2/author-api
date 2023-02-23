export class BaseEntityValidation {
    constructor(
        private readonly input: string,
        private readonly regex: RegExp,
        private readonly shouldValidate = true
    ) {
        if (!this.shouldValidate) return;
        this.isInputValid();
        throw new Error(`Input ${this.input} has the wrong format.`);
    }

    private isInputValid(): boolean {
        return this.input.match(this.regex) !== null;
    }

    get value() {
        return this.input;
    }
}
