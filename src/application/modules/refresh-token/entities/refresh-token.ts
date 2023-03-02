interface RefreshTokenProps {
    id: string;
    expireIn: number;
    userId: string;
    token: string;
}

export class RefreshToken {
    constructor(private props: RefreshTokenProps) {
        this.props = props;
    }

    get id(): string {
        return this.props.id;
    }

    set expireIn(date: number) {
        this.props.expireIn = date;
    }

    get expireIn(): number {
        return this.props.expireIn;
    }

    set userId(userId: string) {
        this.props.userId = userId;
    }

    get userId(): string {
        return this.props.userId;
    }

    set token(refreshToken: string) {
        this.props.token = refreshToken;
    }

    get token(): string {
        return this.props.token;
    }
}
