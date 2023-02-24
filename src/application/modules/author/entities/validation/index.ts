import { validation } from "@constraints/regex";
import { BaseEntityValidation } from "@helpers/base-entity-validation";

export class Email extends BaseEntityValidation {
    constructor(input: string) {
        super(input, validation.emailValidation);
    }
}

export class Password extends BaseEntityValidation {
    constructor(input: string) {
        super(input, validation.passwordValidation);
    }
}

export class Name extends BaseEntityValidation {
    constructor(input: string) {
        super(input, validation.nameValidation);
    }
}
