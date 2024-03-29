import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { validationMiddleWare } from "../middlewares/route.middleware.js";
import {  registerSchema, loginSchema } from "../validations/auth.validation.js";

const userRouter = Router();

userRouter.post("/", validationMiddleWare(registerSchema), authController.registerUser);

export default userRouter;