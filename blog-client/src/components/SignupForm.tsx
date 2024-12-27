import axios from 'axios';
import React, { useState } from 'react';



const SignupForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
          alert(response.data.message);

        } catch (error) {
          if (axios.isAxiosError(error)) {
            alert(error.response?.data?.error || 'Error signing up');
          } else {
            alert('Error signing up');
          }
        }
    };

    return (
        <div className='flex justify-center items-center flex-col'>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                <input type="text" placeholder="Username" onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
                <input type="password" placeholder="Password" onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}



export default SignupForm;