import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';



// Loading the environment variables
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied' });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
    
  } catch (err) {
    res.status(400).json({ error: 'Invalid token' });
  }
};
