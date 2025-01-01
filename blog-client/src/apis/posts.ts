import axios from "axios";


const API_URL = import.meta.env.VITE_API_URL;


// Fetch all posts
export const getAllPosts = async () => {
    const response = await axios.get(`${API_URL}/posts/`);
    return response.data;
};