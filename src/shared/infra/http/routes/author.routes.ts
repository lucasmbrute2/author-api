import { AuthAuthorController } from "@app/modules/author/use-cases/auth/auth-controller";
import { EditProfileController } from "@app/modules/author/use-cases/edit-profile/edit-profile-controller";
import { LogoutController } from "@app/modules/author/use-cases/logout/logout-controller";
import { RegisterAuthorController } from "@app/modules/author/use-cases/register/register-controller";
import { ResetPasswordController } from "@app/modules/author/use-cases/reset-password/reset-password-controller";
import { Router } from "express";
import { Authorization } from "../middlewares/ensure-auth";
const authorRouter = Router();

const registerAuthorController = new RegisterAuthorController();
const authAuthorController = new AuthAuthorController();
const authEditProfileController = new EditProfileController();
const authorization = new Authorization();
const logoutController = new LogoutController();
const resetPasswordController = new ResetPasswordController();

authorRouter.post("/register", registerAuthorController.handle);
authorRouter.post("/auth", authAuthorController.handle);
authorRouter.patch(
    "/edit",
    authorization.ensureAuth,
    authEditProfileController.handle
);

authorRouter.get("/logout", authorization.ensureAuth, logoutController.handle);
authorRouter.put(
    "/reset",
    authorization.ensureAuth,
    resetPasswordController.handle
);

export { authorRouter };
