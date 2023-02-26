import { randomUUID } from "crypto";
import { Author } from "../entities/author-entity";
import { Email, Name, Password } from "../entities/validation";

type partialAuthor = Partial<Author>;

export function makeAuthor(override?: partialAuthor): Author {
    return new Author({
        id: randomUUID(),
        name: new Name("test name"),
        password: new Password("Adk1!331d"),
        email: new Email("testemail@gmail.com"),
        ...override,
    });
}
