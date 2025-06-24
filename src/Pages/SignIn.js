import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  console.log(formData)

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `http://localhost:5000/api/auth/login`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (res.data.success === true) {
        toast.success('Login successful!');
        setTimeout(() => navigate("/"), 2000);
      }
    } catch (error) {
      const backendMessage = error?.response?.data?.message || error.message;
      toast.error(`Login Error: ${backendMessage}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFDF6] to-[#F0E9D2] p-4">
      <div className="w-full max-w-lg shadow-xl rounded-2xl overflow-hidden flex flex-col bg-white">
        <div className="bg-gradient-to-r from-[#A0C878] to-[#8BB654] text-white p-6 text-center">
          <h1 className="font-bold text-3xl md:text-4xl">
            Welcome to <span className="text-[#5b3811] font-extrabold">AI HealthPal</span>
          </h1>
          <p className="font-medium mt-2 text-[#F0F0F0]">Login account</p>
        </div>

        <div className='w-full '>
          <div className="bg-white p-6 md:p-8 overflow-y-auto">
            <form className="space-y-5" onSubmit={handleSubmit}>

              <div>
                <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg placeholder-gray-400 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7f5539]/50 focus:border-transparent transition shadow-sm"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full px-4 py-3 placeholder-gray-400 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7f5539]/50 focus:border-transparent transition shadow-sm pr-10"
                    placeholder="••••••"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters with at least one number</p>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#7f5539] to-[#6a4630] text-white py-3 px-4 rounded-lg font-semibold hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-[#7f5539] focus:ring-offset-2 shadow-md"
                >
                  Sign IN
                </button>
              </div>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Create an Account?{' '}
                <Link
                  to="/register"
                  className="text-[#7f5539] font-medium hover:underline hover:text-[#6a4630] transition"
                >
                  Sign UP
                </Link>
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SignIn;