import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import { connectToDatabase } from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import { verifyToken } from './middleware/auth.js';


// Config
dotenv.config();
const app = express();


// Connect to my MongoDB database
connectToDatabase();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

// Example of a protected route
app.get('/api/protected', verifyToken, (req, res) => {
    res.json({ message: 'This is a protected route', user: req.user });
});



// Home route
app.get('/', (req, res) => {
    res.send('Hello World');
});



// PORT & Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => 
    console.log(`Server running on port ${PORT}`)
);
