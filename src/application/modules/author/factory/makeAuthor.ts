import { Author } from "../entities/author-entity";
import { Email, Name, Password } from "../entities/validation";

type partialAuthor = Partial<Author>;

export function makeAuthor(override?: partialAuthor): Author {
    return new Author({
        bio: "test bio",
        name: new Name("test name"),
        password: new Password("Adk1!331d"),
        email: new Email("testemail@gmail.com"),
        ...override,
    });
}
