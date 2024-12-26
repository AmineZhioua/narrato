import Comment from "../models/comment.js";
import Post from "../models/post.js";
import mongoose from 'mongoose';


// Function to Create a Comment
export async function createComment(req, res) {
    try {
        const { content } = req.body;
        const userId = req.user.id; // Access the ID of the authenticated user
        const  {postId } = req.params;

        const newComment = new Comment({
            content,
            userId,
            postId
        });

        const savedComment = await newComment.save();
        await Post.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } });

        res.status(201).json(savedComment);
    } catch (err) {
        res.status(500).json(err);
    }
}


// Function to Get All Comments by Post ID
export async function getAllCommentsByPost(req, res) {
    try {
        const { postId } = req.params;

        // Ensure postId is converted to a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ error: 'Invalid postId format' });
        }

        const comments = await Comment.find({ postId }).populate('userId');

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve comments', details: error.message });
    }
}


// Function to Delete Comment by ID
export async function deleteComment(req, res) {
    try {
        const { id } = req.params;
        const commentToDelete = await Comment.findByIdAndDelete(id);

        if(!commentToDelete) {
            return res.status(404).json({ error: 'Comment not found' });
        }

        await Post.findByIdAndUpdate(commentToDelete.postId, { $pull: { comments: id } });

        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch(err) {
        res.status(500).json(err);
    }
}