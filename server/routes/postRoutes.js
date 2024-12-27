import express from 'express';
import { 
    createPost, 
    getPostById, 
    deletePost, 
    updatePost,
    getAllPosts,
    likePost
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

// Create a Post route
router.post('/create', verifyToken, createPost);

// Get All Posts route
router.get('/', getAllPosts);

// Get a Post by ID route
router.get('/:id', getPostById);

// Delete a Post route
router.delete('/:id', verifyToken, deletePost);

// Update a Post route
router.put('/:id', verifyToken, updatePost);

// Like or Unlike a Post
router.post('/:postId/like', verifyToken, likePost);



export default router;