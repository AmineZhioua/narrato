import express from 'express';
import { signUpFunction, loginFunction } from '../controllers/authController.js';


const router = express.Router();

// Sing up route
router.post('/signup', signUpFunction);

// Login route
router.post('/login', loginFunction);


export default router;