import { RegisterAuthorRepositoryRequest } from "../use-cases/register-use-case";

type partialAuthorRequest = Partial<RegisterAuthorRepositoryRequest>;

export function makeUserInRequest(
    override?: partialAuthorRequest
): RegisterAuthorRepositoryRequest {
    return {
        email: "testemail@gmail.com",
        password: "Amerau@1234",
        name: "test name",
        confirmPassword: "Amerau@1234",
        ...override,
    };
}
