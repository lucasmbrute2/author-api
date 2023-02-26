import { multerConfigs } from "../../../../application/constraints/upload";
import { UploadController } from "../../../../application/modules/picture/use-cases/upload/upload-controller";
import { Router } from "express";

import multer from "multer";
import { Authorization } from "../middlewares/ensure-auth";
import { DeleteController } from "../../../../application/modules/picture/use-cases/delete/delete-controller";
import { ListByGalleryIdController } from "../../../../application/modules/picture/use-cases/list-all/list-by-gallery-id-controller";

const pictureRoutes = Router();
const upload = multer(multerConfigs);

const authorization = new Authorization();
const uploadController = new UploadController();
const deleteController = new DeleteController();
const listByGalleryIdController = new ListByGalleryIdController();

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

pictureRoutes.get(
    "/listByID",
    authorization.ensureAuth,
    listByGalleryIdController.handle
);

export { pictureRoutes };
