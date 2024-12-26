import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import { 
    createComment, 
    getAllCommentsByPost,
    deleteComment
} from '../controllers/commentController.js';


const router = express.Router();

// Create a Comment route
router.post('/:postId', verifyToken, createComment);

// Get All Comments by Post ID route
router.get('/:postId', getAllCommentsByPost);

// Delete a Comment by ID route
router.delete('/:id', verifyToken, deleteComment);


export default router;