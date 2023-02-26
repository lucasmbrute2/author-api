import { multerConfigs } from "../../../../application/constraints/upload";
import { UploadController } from "../../../../application/modules/picture/use-cases/upload/upload-controller";
import { Router } from "express";

import multer from "multer";
import { Authorization } from "../middlewares/ensure-auth";
import { DeleteController } from "../../../../application/modules/picture/use-cases/delete/delete-controller";

const pictureRoutes = Router();
const upload = multer(multerConfigs);

const authorization = new Authorization();
const uploadController = new UploadController();
const deleteController = new DeleteController();

pictureRoutes.post(
    "/upload",
    authorization.ensureAuth,
    upload.single("pictures"),
    uploadController.handle
);

pictureRoutes.delete(
    "/delete/:fileName",
    authorization.ensureAuth,
    deleteController.handle
);

export { pictureRoutes };
