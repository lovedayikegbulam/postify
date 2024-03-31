import {
  createPost,
  updatePost,
  getAllPosts,
  getPostById,
  deletePost,
} from "../services/postService";
import Post from "../database/schema/post.schema";
import { ErrorWithStatus } from "../exceptions/error-with-status.exception";

// Mock Post model
jest.mock("../database/schema/post.schema");

describe("Post Service", () => {
  describe("createPost", () => {
    it("should create a new post", async () => {
      const userId = "userId";
      const title = "Test Post Title";
      const body = "Test Post Body";
      const newPost = { title, body, user: userId };
      const saveMock = jest.fn().mockResolvedValue(newPost);
      Post.mockReturnValueOnce({ save: saveMock });

      const result = await createPost(title, body, userId);
      expect(result).toEqual(newPost);
      expect(saveMock).toHaveBeenCalledWith();
    });
  });

  describe("updatePost", () => {
    it("should update a post", async () => {
      const postId = "postId";
      const userId = "userId";
      const title = "Updated Title";
      const body = "Updated Body";
      const post = {
        id: postId,
        title: "Old Title",
        body: "Old Body",
        user: { id: userId },
        updatedAt: new Date(),
      };
      Post.findById.mockResolvedValueOnce(post);
      const saveMock = jest.fn().mockResolvedValue(post);
      Post.mockReturnValueOnce({ save: saveMock });

      const result = await updatePost(postId, title, body, userId);
      expect(result.title).toEqual(title);
      expect(result.body).toEqual(body);
      expect(saveMock).toHaveBeenCalledWith();
    });

    it("should throw error if post not found", async () => {
      const postId = "nonExistingPostId";
      Post.findById.mockResolvedValueOnce(null);

      await expect(
        updatePost(postId, "Title", "Body", "userId")
      ).rejects.toThrow(new ErrorWithStatus("Post not found", 401));
    });

    it("should throw error if user not authorized to update post", async () => {
      const postId = "postId";
      const userId = "anotherUserId";
      const post = { user: { id: "userId" } };
      Post.findById.mockResolvedValueOnce(post);

      await expect(updatePost(postId, "Title", "Body", userId)).rejects.toThrow(
        new ErrorWithStatus("You are not authorized to update this post", 403)
      );
    });
  });
});
