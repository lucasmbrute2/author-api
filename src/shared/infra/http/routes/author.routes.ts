import { RegisterAuthorController } from "../../../../application/modules/author/use-cases/register-author-controller";
import { Router } from "express";
import { AuthAuthorController } from "../../../../application/modules/author/use-cases/auth-author-controller";
const authorRouter = Router();

const registerAuthorController = new RegisterAuthorController();
const authAuthorController = new AuthAuthorController();

authorRouter.post("/register", registerAuthorController.handle);
authorRouter.post("/auth", authAuthorController.handle);

export { authorRouter };
