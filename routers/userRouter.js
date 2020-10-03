import express from 'express';
import routes from '../routes';
import {
  usersController,
  userDetailController,
  editProfileController,
  changePasswordController,
} from '../controllers/userController';
import { onlyPrivate } from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.editProfile, onlyPrivate, editProfileController);
userRouter.get(routes.changePassword, onlyPrivate, changePasswordController);
userRouter.get(routes.userDetail(), userDetailController);

export default userRouter;
