import { validation } from "@app/constraints/regex";
import { BaseEntityValidation } from "@app/helpers/base-entity-validation";

export class Email extends BaseEntityValidation {
    constructor(input: string, shouldValidate = true) {
        super(input, validation.emailValidation, shouldValidate);
    }
}

export class Password extends BaseEntityValidation {
    constructor(input: string, shouldValidate = true) {
        super(input, validation.passwordValidation, shouldValidate);
    }
}

export class Name extends BaseEntityValidation {
    constructor(input: string, shouldValidate = true) {
        super(input, validation.nameValidation, shouldValidate);
    }
}
