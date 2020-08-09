import express from "express";
import routes from "../routes";
import { home, search, homeController, searchController } from "../controllers/videoController";
import { join, login, logout, joinController, loginController, logoutController } from "../controllers/userController";

const globalRouter = express.Router();

/* videoController */
globalRouter.get(routes.home, homeController);
globalRouter.get(routes.search, searchController);
/* userController */
globalRouter.get(routes.join, joinController);
globalRouter.get(routes.login, loginController);
globalRouter.get(routes.logout, logoutController);

export default globalRouter;