import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await API.post(
        "/auth/register",
        formData
      );

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-full min-h-screen">
      {/* Right side colorful mesh visual (inverted from login) */}
      <div className="hidden lg:flex lg:w-1/2 mesh-bg relative overflow-hidden flex-col justify-center items-center">
        <div className="glass-card p-12 rounded-3xl max-w-lg mx-auto text-white text-center transform hover:-translate-y-2 transition-transform duration-500">
          <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/30">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold mb-4">Start your journey</h2>
          <p className="text-indigo-50 text-lg leading-relaxed">
            Create an account today to access mock interviews, comprehensive practice modules, 
            and track your professional progress all in one unified dashboard.
          </p>
        </div>
      </div>

      {/* Left (or right on desktop) side form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-8 sm:p-12 lg:p-24 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium">Join MeetConnect to supercharge your career.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiUser className="text-slate-400" />
                </div>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-slate-400" />
                </div>
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-slate-400" />
                </div>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-colors"
                />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-indigo-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 focus:ring-4 focus:ring-indigo-100 transition-all flex justify-center items-center mt-4"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-center text-slate-600">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;