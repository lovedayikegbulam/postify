import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import { validationMiddleWare } from "../middlewares/route.middleware.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import postSchema from "../validations/post.validation.js";

const postRouter = Router();

postRouter.post(
  "/create",
  validationMiddleWare(postSchema),
  authMiddleware,
  postController.createPost
);

postRouter.patch(
  "/update",
  validationMiddleWare(postSchema),
  authMiddleware,
  postController.updatePost
);

postRouter.get("/:postId", postController.getPostById);
postRouter.delete("/:postId", authMiddleware, postController.deletePost);
postRouter.get("/all", postController.getAllPosts);

export default postRouter;
