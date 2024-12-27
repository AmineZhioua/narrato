import Post from "../models/post.js";
import mongoose from 'mongoose';

// Function to Create a Post
export async function createPost(req, res) {
    try {
        const { title, content, image } = req.body;
        const userId = req.user.id;

        const newPost = new Post({
            title,
            content,
            image,
            userId
        });

        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
}


// Function to Get All Posts
export async function getAllPosts(req, res) {
    try {
        const posts = await Post.find().populate('userId').populate('comments'); // DON'T FORGET TO POPULATE THE COMMENTS FIELD

        res.status(200).json(posts);
    } catch(err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
}


// Function to Get a Post by ID
export async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id).populate('userId').populate('comments');

        if(!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(post);
    } catch(err) {
        res.status(500).json(err);
    }
}


// Function to Delete a Post
export async function deletePost(req, res) {
    try {
        const postToDelete = await Post.findByIdAndDelete(req.params.id);

        if(!postToDelete) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch(err) {
        res.status(500).json(err);
    }
}


// Function to Update a Post
export async function updatePost(req, res) {
    try {
        const postToUpdate = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if(!postToUpdate) {
            return res.status(404).json({ error: 'Post not found' });
        }

        res.status(200).json(postToUpdate);
    } catch(err) {
        res.status(500).json(err);
    }
}


// Function to Like or Unlike a Post
export async function likePost(req, res) {
    try {
        const { postId } = req.params;
        const userId = req.user.id;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const alreadyLiked = post.likes.includes(userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            message: alreadyLiked ? 'Post unliked' : 'Post liked',
            likesCount: post.likes.length,
        });

    } catch (error) {
        res.status(500).json({ error: 'Failed to like or unlike the post', details: error.message });
    }
}