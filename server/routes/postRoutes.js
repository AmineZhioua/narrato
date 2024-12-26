import express from 'express';
import { 
    createPost, 
    getPostById, 
    deletePost, 
    updatePost,
    getAllPosts
} from '../controllers/postController.js';
import { verifyToken } from '../middleware/auth.js';


const router = express.Router();

// Create a Post route
router.post('/create', verifyToken, createPost);

// Get a Post by ID route
router.get('/:id', getPostById);

// Get All Posts route
router.get('/', getAllPosts);

// Delete a Post route
router.delete('/:id', verifyToken, deletePost);

// Update a Post route
router.put('/:id', verifyToken, updatePost);



export default router;