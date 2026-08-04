import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { 
  FaUser, 
  FaEnvelope, 
  FaLock, 
  FaGlobe, 
  FaGithub, 
  FaLink, 
  FaInfoCircle,
  FaArrowRight,
  FaCheckCircle,
  FaUserPlus
} from "react-icons/fa";
import { GiBoxingGlove } from "react-icons/gi";

function Signup() {
  const { signup, setError } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    country: "",
    github: "",
    portfolio: "",
  });
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Password strength check
    if (name === "password") {
      checkPasswordStrength(value);
    }
  };

  const checkPasswordStrength = (password) => {
    if (password.length === 0) {
      setPasswordStrength("");
      return;
    }
    if (password.length < 6) {
      setPasswordStrength("Weak");
    } else if (password.length < 10) {
      setPasswordStrength("Medium");
    } else {
      setPasswordStrength("Strong");
    }
  };

  const getPasswordColor = () => {
    switch(passwordStrength) {
      case "Weak": return "text-red-400";
      case "Medium": return "text-yellow-400";
      case "Strong": return "text-green-400";
      default: return "text-gray-500";
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      setMessage("");
      await signup(formData);
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

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        
        {/* Logo / Brand */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 mb-4">
            <GiBoxingGlove className="text-red-500 text-2xl" />
            <span className="text-white font-bold text-lg">GOA</span>
            <span className="text-green-400 font-bold text-lg">Academy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Create Account
          </h1>
          <p className="text-gray-400 text-sm sm:text-base mt-1">
            Join the GOA Academy community
          </p>
        </div>

        {/* Signup Card */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
          
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-green-600/20 p-2.5 rounded-xl border border-green-500/30">
              <FaUserPlus className="text-green-400 text-xl" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Sign Up</h2>
              <p className="text-gray-400 text-xs">Create your GOA Academy account</p>
            </div>
          </div>

          {/* Message */}
          {message && (
            <div className="mb-4 rounded-xl bg-red-950/50 border border-red-500/30 px-4 py-3 flex items-center gap-3 text-red-300 text-sm">
              <span className="text-lg">⚠</span>
              <span className="flex-1">{message}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="mb-1.5 block text-xs sm:text-sm text-gray-300 font-medium">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                  <FaUser className="text-sm" />
                </div>
                <input
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl 
                    border border-white/10 bg-black/40 
                    pl-9 pr-4 py-2.5 
                    text-white text-sm 
                    outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                    placeholder:text-gray-600 transition-all duration-300
                  "
                  placeholder="John Doe"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Username */}
              <div>
                <label className="mb-1.5 block text-xs sm:text-sm text-gray-300 font-medium">
                  Username
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <span className="text-sm">@</span>
                  </div>
                  <input
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl 
                      border border-white/10 bg-black/40 
                      pl-8 pr-4 py-2.5 
                      text-white text-sm 
                      outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                      placeholder:text-gray-600 transition-all duration-300
                    "
                    placeholder="johndoe"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="mb-1.5 block text-xs sm:text-sm text-gray-300 font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaEnvelope className="text-sm" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl 
                      border border-white/10 bg-black/40 
                      pl-9 pr-4 py-2.5 
                      text-white text-sm 
                      outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                      placeholder:text-gray-600 transition-all duration-300
                    "
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* Password */}
              <div>
                <label className="mb-1.5 block text-xs sm:text-sm text-gray-300 font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaLock className="text-sm" />
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl 
                      border border-white/10 bg-black/40 
                      pl-9 pr-10 py-2.5 
                      text-white text-sm 
                      outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                      placeholder:text-gray-600 transition-all duration-300
                    "
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors text-sm"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                {passwordStrength && (
                  <div className="mt-1.5 flex items-center gap-2">
                    <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          passwordStrength === "Weak" ? "w-1/3 bg-red-500" :
                          passwordStrength === "Medium" ? "w-2/3 bg-yellow-500" :
                          "w-full bg-green-500"
                        }`}
                      ></div>
                    </div>
                    <span className={`text-xs font-medium ${getPasswordColor()}`}>
                      {passwordStrength}
                    </span>
                  </div>
                )}
              </div>

              {/* Country */}
              <div>
                <label className="mb-1.5 block text-xs sm:text-sm text-gray-300 font-medium">
                  Country
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaGlobe className="text-sm" />
                  </div>
                  <input
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl 
                      border border-white/10 bg-black/40 
                      pl-9 pr-4 py-2.5 
                      text-white text-sm 
                      outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                      placeholder:text-gray-600 transition-all duration-300
                    "
                    placeholder="United States"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {/* GitHub */}
              <div>
                <label className="mb-1.5 block text-xs sm:text-sm text-gray-300 font-medium">
                  GitHub URL
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaGithub className="text-sm" />
                  </div>
                  <input
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl 
                      border border-white/10 bg-black/40 
                      pl-9 pr-4 py-2.5 
                      text-white text-sm 
                      outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                      placeholder:text-gray-600 transition-all duration-300
                    "
                    placeholder="https://github.com/username"
                  />
                </div>
              </div>

              {/* Portfolio */}
              <div>
                <label className="mb-1.5 block text-xs sm:text-sm text-gray-300 font-medium">
                  Portfolio URL
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    <FaLink className="text-sm" />
                  </div>
                  <input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    className="
                      w-full rounded-xl 
                      border border-white/10 bg-black/40 
                      pl-9 pr-4 py-2.5 
                      text-white text-sm 
                      outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                      placeholder:text-gray-600 transition-all duration-300
                    "
                    placeholder="https://yourportfolio.com"
                  />
                </div>
              </div>
            </div>

            {/* Bio */}
            <div>
              <label className="mb-1.5 block text-xs sm:text-sm text-gray-300 font-medium">
                Bio
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-gray-500">
                  <FaInfoCircle className="text-sm" />
                </div>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  className="
                    w-full rounded-xl 
                    border border-white/10 bg-black/40 
                    pl-9 pr-4 py-2.5 
                    text-white text-sm 
                    outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                    placeholder:text-gray-600 transition-all duration-300
                    resize-none
                  "
                  rows="3"
                  placeholder="Tell us about yourself..."
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
                rounded-xl px-4 py-3 
                text-white font-semibold text-sm
                hover:shadow-2xl hover:shadow-green-500/30
                transition-all duration-300 hover:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
              "
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>

          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-green-400 hover:text-green-300 font-medium transition-colors">
                Sign In
              </Link>
            </p>
            <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-gray-500">
              <span className="flex items-center gap-1">Secure registration</span>
              <span>•</span>
              <span>GOA Academy</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Signup;