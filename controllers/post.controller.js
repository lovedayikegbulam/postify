import * as postService from '../services/post.service.js';
import * as userService from '../services/user.service.js';



export const createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        const userId = req.user.id;
        
        // Fetch user details from the database
        const user = await userService.getUserById(userId);

        // Check if user exists
        if (!user) {
            throw new Error('User not found');
        }

        // Create post with the user's ObjectId
        const newPost = await postService.createPost(title, body, user.id);
        
        // Send response with the entire user object included
        res.status(201).json({ message: 'Post created successfully', data: { ...newPost.toObject(), user } });
    } catch (error) {
        res.status(400).json({ message: 'Post creation failed', error: error.message });
    }
};

export const updatePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, body } = req.body;
        const userId = req.user.id; 
        const updatedPost = await postService.updatePost(postId, title, body, userId);
        res.json({ message: 'Post updated successfully', data: updatedPost });
    } catch (error) {
        res.status(400).json({ message: 'Post update failed', error: error.message });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.json({ message: 'All posts', data: posts });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching posts', error: error.message });
    }
};

export const getPostById = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await postService.getPostById(postId);
        res.json({ message: 'Post', data: post });
    } catch (error) {
        res.status(400).json({ message: 'Error fetching post', error: error.message });
    }
};

export const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.id; 
        await postService.deletePost(postId, userId);
        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Post deletion failed', error: error.message });
    }
};
