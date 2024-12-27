import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Sign } from 'crypto';
import SignupForm from './components/SignupForm';


interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  createdAt: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  },
  comments: [
    {
      _id: string;
      content: string;
      userId: string;
      postId: string;
      createdAt: string;
    }
  ];
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get('http://localhost:5000/api/posts/');
      setPosts(response.data);
    }

    fetchPosts();

  }, []);


  return (
    <div>
      { 
        posts.map((post) => (
          <>
            <div key={post._id}>
              <img src={post.image} alt="img" height={300} width={300}/>
                <h2>{post.title}</h2>
                <p>{post.content}</p>
                <p>{post.userId.username}</p>
                <p>{post.userId.email}</p>
            </div>
            <hr />
          </>
        ))
      }
      <SignupForm />
    </div>
  );
}



export default App;