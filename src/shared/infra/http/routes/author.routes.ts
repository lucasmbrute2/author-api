import { RegisterAuthorController } from "../../../../application/modules/author/use-cases/register-controller";
import { Router } from "express";
import { AuthAuthorController } from "../../../../application/modules/author/use-cases/auth-controller";
import { EditProfileController } from "../../../../application/modules/author/use-cases/edit-profile-controller";
const authorRouter = Router();

const registerAuthorController = new RegisterAuthorController();
const authAuthorController = new AuthAuthorController();
const authEditProfileController = new EditProfileController();

authorRouter.post("/register", registerAuthorController.handle);
authorRouter.post("/auth", authAuthorController.handle);
authorRouter.patch("/edit/:id", authEditProfileController.handle);

export { authorRouter };
