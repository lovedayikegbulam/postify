// Import necessary modules and functions
import * as postService from "../services/post.service.js";
import Post from "../database/schema/post.schema.js";
import { ErrorWithStatus } from "../exceptions/error-with-status.exception.js";

// Mock Post model
jest.mock("../database/schema/post.schema.js");

describe("createPost", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should create a new post", async () => {
    // Define test data
    const title = "Test Title";
    const body = "Test Body";
    const userId = "user123";

    // Mock the behavior of the Post model's save method
    const saveMock = jest.fn().mockResolvedValue({
      _id: "generatedId",
      title,
      body,
      user: userId,
    });
    Post.mockImplementation(() => ({
      save: saveMock,
    }));

    // Call the createPost function
    const result = await postService.createPost(title, body, userId);

    // Verify that the Post model was instantiated with the correct arguments
    expect(Post).toHaveBeenCalledWith({ title, body, user: userId });

    // Verify that the save method was called on the Post instance
    expect(saveMock).toHaveBeenCalledTimes(1);

    // Verify that the result matches the expected new post object
    expect(result).toEqual({
      _id: "generatedId",
      title,
      body,
      user: userId,
    });
  });
});

describe("getAllPosts", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch all posts", async () => {
    // Define test data
    const limit = 10;
    const page = 1;
    const order = "desc";
    const orderBy = "createdAt";

    // Mocked array of posts
    const posts = [
      { _id: "1", title: "Post 1", body: "Body 1", user: "user1" },
      { _id: "2", title: "Post 2", body: "Body 2", user: "user2" },
      // Add more mocked posts as needed
    ];

    // Mock the behavior of the Post model's find method
    jest.spyOn(Post, "find").mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockReturnThis(),
      sort: jest.fn().mockResolvedValue(posts),
    });

    // Call the getAllPosts function
    const result = await postService.getAllPosts(limit, page, order, orderBy);

    // Verify that the find method was called with the correct parameters
    expect(Post.find).toHaveBeenCalledWith();
    expect(Post.find().skip).toHaveBeenCalledWith((page - 1) * limit);
    expect(Post.find().limit).toHaveBeenCalledWith(limit);
    expect(Post.find().populate).toHaveBeenCalledWith("user");
    expect(Post.find().sort).toHaveBeenCalledWith({
      [orderBy]: order === "desc" ? -1 : 1,
    });

    // Verify that the result matches the expected posts
    expect(result).toEqual(posts);
  });

  it("should throw an error if an error occurs while fetching posts", async () => {
    // Define test data
    const limit = 10;
    const page = 1;
    const order = "desc";
    const orderBy = "createdAt";
    const errorMessage = "Error fetching posts";

    // Mock the behavior of the Post model's find method to throw an error
    jest.spyOn(Post, "find").mockImplementation(() => {
      throw new Error(errorMessage);
    });

    // Call the getAllPosts function and expect it to throw an error
    await expect(
      postService.getAllPosts(limit, page, order, orderBy)
    ).rejects.toThrow(`Error fetching posts: ${errorMessage}`);
  });
});

describe("getPostById", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch a post by ID", async () => {
    // Define test data
    const postId = "post123";
    const user = { _id: "user123" };

    // Mocked post
    const post = {
      _id: postId,
      title: "Test Title",
      body: "Test Body",
      user: user,
    };

    // Mock the behavior of the Post model's findById method
    jest.spyOn(Post, "findById").mockReturnValue({
      populate: jest.fn().mockReturnThis(),
      post: post
    });

    // Call the getPostById function
    const result = await postService.getPostById(postId);

    // Verify that the findById method was called with the correct postId
    expect(Post.findById).toHaveBeenCalledWith(postId);

    // Verify that the result matches the expected post
    expect(result).toEqual({
      post: post,
      populate: expect.any(Function)
    });
  });

  it("should throw an error if post is not found", async () => {
    // Define test data
    const postId = "invalidId";

    // Mock the behavior of the Post model's findById method to return null
    jest.spyOn(Post, "findById").mockResolvedValue(null);

    // Call the getPostById function and expect it to throw an error
    await expect(postService.getPostById(postId)).rejects.toThrow(
      ErrorWithStatus
    );
  });
});


describe("deletePost", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should delete a post", async () => {
    // Define test data
    const postId = "post123";
    const userId = "user123";

    // Mocked post
    const post = {
      _id: postId,
      user: userId,
      deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 })
    };

    // Mock the behavior of the Post model's findById method
    jest.spyOn(Post, "findById").mockResolvedValue(post);

    // Call the deletePost function
    await postService.deletePost(postId, userId);

    // Verify that the findById method was called with the correct postId
    expect(Post.findById).toHaveBeenCalledWith(postId);

    // Verify that the deleteOne method was called on the post
    expect(post.deleteOne).toHaveBeenCalled();
  });

  it("should throw an error if post is not found", async () => {
    // Define test data
    const postId = "invalidId";
    const userId = "user123";

    // Mock the behavior of the Post model's findById method to return null
    jest.spyOn(Post, "findById").mockResolvedValue(null);

    // Call the deletePost function and expect it to throw an error
    await expect(postService.deletePost(postId, userId)).rejects.toThrow(ErrorWithStatus);
  });

  it("should throw an error if user is not authorized to delete post", async () => {
    // Define test data
    const postId = "post123";
    const userId = "user456";

    // Mocked post
    const post = {
      _id: postId,
      user: "user123"
    };

    // Mock the behavior of the Post model's findById method
    jest.spyOn(Post, "findById").mockResolvedValue(post);

    // Call the deletePost function and expect it to throw an error
    await expect(postService.deletePost(postId, userId)).rejects.toThrow(ErrorWithStatus);
  });
});