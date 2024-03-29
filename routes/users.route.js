import { Router } from "express";
import * as userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post("/", userController.registerUser);

export default userRouter;