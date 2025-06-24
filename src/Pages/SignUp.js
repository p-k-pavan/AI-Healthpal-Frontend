import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuthStore } from '../store/useAuthStore';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        role: 'Patient',
        gender: 'Male',
        email: '',
        password: ''
    });

    const register = useAuthStore((state) => state.register);
    const status = useAuthStore((state) => state.status);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { success } = await register(formData);
            if (success) {
                toast.success('Register successful!');
                navigate('/');
            }
        } catch (error) {
            const message = error.response?.data?.message || error.message;
            toast.error(`Register failed: ${message}`);
            setFormData(prev => ({ ...prev, password: '' }));
        }
    };


    const roleImages = {
        Patient: "/patient-registration.png",
        Doctor: "/registration.png",
        Admin: "/registration.png",
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#FFFDF6] to-[#F0E9D2] p-4">
            <div className="w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden flex flex-col bg-white">
                <div className="bg-gradient-to-r from-[#A0C878] to-[#8BB654] text-white p-6 text-center">
                    <h1 className="font-bold text-3xl md:text-4xl">
                        Welcome to <span className="text-[#5b3811] font-extrabold">AI HealthPal</span>
                    </h1>
                    <p className="font-medium mt-2 text-[#F0F0F0]">Create your account</p>
                </div>

                <div className='flex flex-col md:flex-row'>
                    <div className="hidden md:block md:w-1/2 lg:w-3/5 relative">
                        <img
                            src={roleImages[formData.role]}
                            alt="Healthcare professionals"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-6">
                            <div className="text-white">
                                <h3 className="font-bold text-xl mb-2">Your Health Journey Starts Here</h3>
                                <p className="text-sm opacity-90">Join thousands of patients and professionals using AI HealthPal</p>
                            </div>
                        </div>
                    </div>

                    <div className='w-full md:w-1/2 lg:w-3/5'>
                        <div className="bg-white p-6 md:p-8 overflow-y-auto">
                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="flex justify-between bg-[#FAF6E9] p-1 rounded-lg">
                                    {['Patient', 'Doctor', 'Admin'].map((role) => (
                                        <button
                                            key={role}
                                            type="button"
                                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${formData.role === role ? 'bg-[#7f5539] text-white' : 'text-[#7f5539] hover:bg-[#f0e9d2]'}`}
                                            onClick={() => setFormData({ ...formData, role })}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>

                                <div>
                                    <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7f5539]/50 focus:border-transparent transition shadow-sm"
                                        placeholder="John Doe"
                                        required
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="dob" className="block text-gray-700 text-sm font-medium mb-2">
                                            Date of Birth
                                        </label>
                                        <input
                                            type="date"
                                            id="dob"
                                            value={formData.dob}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7f5539]/50 focus:border-transparent transition shadow-sm"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="gender" className="block text-gray-700 text-sm font-medium mb-2">
                                            Gender
                                        </label>
                                        <select
                                            id="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7f5539]/50 focus:border-transparent transition shadow-sm appearance-none bg-white"
                                        >
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Transgender">Transgender</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7f5539]/50 focus:border-transparent transition shadow-sm"
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
                                            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#7f5539]/50 focus:border-transparent transition shadow-sm pr-10"
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
                                        disabled={status === 'loading'}
                                    >
                                        Sign Up as {formData.role}
                                    </button>
                                </div>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-sm text-gray-600">
                                    Already have an account?{' '}
                                    <Link
                                        to="/login"
                                        className="text-[#7f5539] font-medium hover:underline hover:text-[#6a4630] transition"
                                    >
                                        Sign In
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;