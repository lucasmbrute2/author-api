import { RegisterAuthorRepositoryRequest } from "../use-cases/register/register-use-case";

type PartialAuthorRequest = Partial<RegisterAuthorRepositoryRequest>;

export function makeUserInRequest(
    override?: PartialAuthorRequest
): RegisterAuthorRepositoryRequest {
    return {
        email: "testemail@gmail.com",
        password: "Amerau@1234",
        name: "test name",
        confirmPassword: "Amerau@1234",
        ...override,
    };
}
