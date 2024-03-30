import { Router } from "express";
import * as postController  from "../controllers/post.controller.js";
import { validationMiddleWare } from "../middlewares/route.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import postSchema  from "../validations/post.validation.js";

const userRouter = Router();

userRouter.post("/create", validationMiddleWare(postSchema), authMiddleware, postController.createPost);



export default userRouter;