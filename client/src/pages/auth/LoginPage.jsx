import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { Car } from 'lucide-react';
import { Button } from '../../components/common';
import { useAuth, useToast } from '../../context';
import { authApi } from '../../services/api';

export const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname === "/admin/login";
const isDriver = location.pathname === "/driver/login";
  const { login } = useAuth();
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const from = location.state?.from?.pathname || '/dashboard';
  const isAdminLogin = location.pathname === '/admin/login';

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await login({
  ...formData,
  role: isAdmin
    ? "admin"
    : isDriver
    ? "driver"
    : "user",
});
      toast.success('Welcome back! Login successful.');
      if (response.user.role === "admin") {
  navigate("/admin/dashboard");
} else if (response.user.role === "driver") {
  navigate("/driver/dashboard");
} else {
  navigate("/dashboard");
}
    } catch (error) {
      const message = error.response?.data?.message || 'Login failed. Please try again.';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-dark-300">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-12 h-12 rounded-xl bg-primary-600 flex items-center justify-center">
              <Car className="w-7 h-7 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white">
              U<span className="text-primary-600">CAB</span>
            </span>
          </Link>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
            <p className="text-gray-600 dark:text-gray-400">Sign in to continue your journey</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiMail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={`w-full pl-12 pr-4 py-3 bg-white dark:bg-dark-200 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FiAlertCircle className="w-4 h-4" />{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <FiLock className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-12 pr-12 py-3 bg-white dark:bg-dark-200 border rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${errors.password ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'}`}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <FiEyeOff className="w-5 h-5" /> : <FiEye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500 flex items-center gap-1"><FiAlertCircle className="w-4 h-4" />{errors.password}</p>}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-gray-600 dark:text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">Forgot password?</Link>
            </div>

            {/* Submit Button */}
            <Button type="submit" variant="primary" loading={loading} block>Sign In</Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-200 dark:border-gray-700" /></div>
            <div className="relative flex justify-center text-sm"><span className="px-4 bg-white dark:bg-dark-300 text-gray-500">New to UCAB?</span></div>
          </div>

          {/* Register Link */}
          <Link to="/register"><Button variant="outline" block>Create an Account</Button></Link>

          {/* Driver & Admin Links */}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <Link to="/driver/login" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Driver Login</Link>
            <span className="text-gray-300 dark:text-gray-600">|</span>
            <Link to="/admin/login" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400">Admin Login</Link>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-primary">
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-white">
          <div className="w-32 h-32 mb-8 rounded-full bg-white/20 flex items-center justify-center">
            <Car className="w-20 h-20" />
          </div>
          <h2 className="text-3xl font-bold mb-4 text-center">Your Journey Starts Here</h2>
          <p className="text-lg text-white/80 text-center max-w-md">Safe, reliable, and affordable cab services. Book your ride in seconds and travel with confidence.</p>
        </div>
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>
    </div>
  );
};
