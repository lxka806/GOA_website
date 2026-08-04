import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { FaEnvelope, FaLock, FaUserShield, FaArrowRight } from "react-icons/fa";
import { GiBoxingGlove } from "react-icons/gi";

function Login() {
  const { login, setError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      setMessage("");
      await login({ email, password });
      navigate("/");
    } catch (error) {
      setError(error.message);
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-3 sm:px-4 py-8 sm:py-12">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto">
        
        {/* Logo / Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 mb-4">
            <GiBoxingGlove className="text-red-500 text-2xl" />
            <span className="text-white font-bold text-lg">GOA</span>
            <span className="text-green-400 font-bold text-lg">Academy</span>
            <span className="text-red-500 text-sm font-medium"></span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Login to continue your learning journey
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600/20 p-2.5 rounded-xl border border-green-500/30">
              <FaUserShield className="text-green-400 text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Sign In</h2>
              <p className="text-gray-400 text-xs">Access your account</p>
            </div>
          </div>

          {/* Error Message */}
          {message && (
            <div className="mb-4 rounded-xl bg-red-950/50 border border-red-500/30 px-4 py-3 flex items-center gap-3 text-red-300 text-sm">
              <span className="text-lg"></span>
              <span className="flex-1">{message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            
            {/* Email */}
            <div>
              <label className="mb-1.5 sm:mb-2 block text-xs sm:text-sm text-gray-300 font-medium">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaEnvelope className="text-sm sm:text-base" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="
                    w-full rounded-xl sm:rounded-2xl 
                    border border-white/10 bg-black/40 
                    pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 
                    text-white text-sm sm:text-base 
                    outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                    placeholder:text-gray-600 transition-all duration-300
                  "
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                <label className="block text-xs sm:text-sm text-gray-300 font-medium">
                  Password
                </label>
                <Link 
                  to="/forgot-password" 
                  className="text-[10px] sm:text-xs text-green-400 hover:text-green-300 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaLock className="text-sm sm:text-base" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="
                    w-full rounded-xl sm:rounded-2xl 
                    border border-white/10 bg-black/40 
                    pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 
                    text-white text-sm sm:text-base 
                    outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                    placeholder:text-gray-600 transition-all duration-300
                  "
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isLoading}
              className="
                w-full group relative overflow-hidden
                bg-gradient-to-r from-green-600 to-green-500 
                rounded-xl sm:rounded-2xl px-4 py-3 sm:py-3.5 
                text-white font-semibold text-sm sm:text-base
                hover:shadow-2xl hover:shadow-green-500/30
                transition-all duration-300 hover:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              "
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Logging in...
                  </>
                ) : (
                  <>
                    Sign In
                    <FaArrowRight className="
                      text-sm sm:text-base group-hover:translate-x-1 
                      transition-transform duration-300
                    " />
                  </>
                )}
              </span>
            </button>

          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                Create one
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-[10px] sm:text-xs text-gray-500">
              <span>Secure login</span>
              <span>•</span>
              <span>GOA Academy</span>
              <span>•</span>
              <span>MMA</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;