class Token {
    private readonly SECONDS = 60;
    private readonly TOKEN_EXPIRE_IN_HOURS: number;

    constructor(hours: number) {
        this.TOKEN_EXPIRE_IN_HOURS = this.SECONDS * this.SECONDS * hours;
    }

    getTokenExpirationHours() {
        return this.TOKEN_EXPIRE_IN_HOURS;
    }
}

export class TokenExpiration extends Token {
    constructor(hours: number) {
        super(hours);
    }
}
