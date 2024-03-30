// services/postService.js
import Post from '../database/schema/post.schema.js';

export const createPost = async (title, body, userId) => {
    const newPost = new Post({ title, body, user: userId });
    return await newPost.save();
};


export const updatePost = async (postId, title, body, userId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    if (post.user.toString() !== userId) {
        throw new Error('You are not authorized to update this post');
    }
    if (title) post.title = title;
    if (body) post.body = body;
    post.updatedAt = Date.now();
    return await post.save();
};

export const getAllPosts = async () => {
    return await Post.find().populate('user');
};

export const getPostById = async (postId) => {
    const post = await Post.findById(postId).populate('user');
    if (!post) {
        throw new Error('Post not found');
    }
    return post;
};

export const deletePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    if (post.user.toString() !== userId) {
        throw new Error('You are not authorized to delete this post');
    }
    await post.remove();
};
