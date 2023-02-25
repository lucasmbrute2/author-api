import { Router } from "express";
import { authorRouter } from "./author.routes";
import { pictureRoutes } from "./picture.routes";

const route = Router();

route.use("/author", authorRouter);
route.use("/picture", pictureRoutes);
export { route };
