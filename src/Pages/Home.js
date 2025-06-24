// pages/Home.jsx or components/Home.jsx
import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    // If user is not logged in, redirect to login page
    if (!isAuthenticated || !user) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate]);

  console.log(user)

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome {user?.name || "User"}!</h1>
      <p>You are now authenticated.</p>
    </div>
  );
};

export default Home;
