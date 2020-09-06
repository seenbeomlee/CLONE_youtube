import express from 'express';
import routes from '../routes';
import {
  homeController,
  searchController,
} from '../controllers/videoController';
import {
  getJoinController,
  postJoinController,
  loginController,
  logoutController,
} from '../controllers/userController';

const globalRouter = express.Router();
/* */
globalRouter.get(routes.join, getJoinController);
globalRouter.post(routes.join, postJoinController);
/* videoController */
globalRouter.get(routes.home, homeController);
globalRouter.get(routes.search, searchController);
/* userController */
globalRouter.get(routes.login, loginController);
globalRouter.get(routes.logout, logoutController);

export default globalRouter;
