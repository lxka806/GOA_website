import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { 
  FaHome, 
  FaBook, 
  FaNewspaper, 
  FaMap, 
  FaProjectDiagram, 
  FaInfoCircle,
  FaUserShield,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaBars,
  FaTimes,
  FaCrown
} from "react-icons/fa";
import { GiBoxingGlove } from "react-icons/gi";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);

  const navItems = [
    { to: "/", label: "Home", icon: <FaHome /> },
    { to: "/courses", label: "Courses", icon: <FaBook /> },
    { to: "/posts", label: "Posts", icon: <FaNewspaper /> },
    { to: "/roadmap", label: "RoadMap", icon: <FaMap /> },
    { to: "/projects", label: "Projects", icon: <FaProjectDiagram /> },
    { to: "/about", label: "About", icon: <FaInfoCircle /> },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">

          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-white hover:opacity-80 transition-opacity flex-shrink-0"
            onClick={closeMenu}
          >
            <GiBoxingGlove className="text-red-500 text-xl sm:text-2xl" />
            <span>G<span className="text-green-500">O</span>A</span>
            <span className="hidden xs:inline text-xs text-gray-500 font-normal">Academy</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <ul className="flex items-center gap-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <span className="text-green-400/60 text-sm">{item.icon}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
              {user?.role === "admin" && (
                <li>
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-200"
                  >
                    <FaUserShield className="text-amber-400/60" />
                    Admin
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity group">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.username || "User"}
                      className="h-9 w-9 rounded-full object-cover border-2 border-green-500/50 group-hover:border-green-400 transition-colors"
                    />
                  ) : (
                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-sm font-bold text-white">
                      {user.username?.[0]?.toUpperCase() || "U"}
                    </div>
                  )}
                  <span className="text-sm text-gray-300 max-w-[100px] truncate">
                    {user.username || user.fullName || "User"}
                  </span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-lg bg-green-600/20 hover:bg-green-600/30 px-4 py-2 text-sm font-medium text-green-400 hover:text-green-300 transition-all duration-200 border border-green-500/20 hover:border-green-500/40"
                >
                  <FaSignOutAlt className="text-xs" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-lg bg-green-600 hover:bg-green-700 px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-lg hover:shadow-green-500/25"
                >
                  <FaSignInAlt className="text-xs" />
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="flex items-center gap-2 rounded-lg border border-green-500/50 hover:border-green-500 px-4 py-2 text-sm font-medium text-green-400 hover:text-white hover:bg-green-600 transition-all duration-200"
                >
                  <FaUserPlus className="text-xs" />
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 transition-colors text-gray-300 hover:text-white"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
          </button>

        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`
        lg:hidden fixed inset-x-0 top-16 sm:top-20 bg-black/98 backdrop-blur-xl border-b border-white/10
        transition-all duration-300 ease-in-out overflow-hidden
        ${isMenuOpen ? 'max-h-[calc(100vh-64px)] opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="px-4 py-6 space-y-1">
          {/* Mobile Nav Items */}
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              <span className="text-green-400/60">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          
          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={closeMenu}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 transition-all duration-200"
            >
              <FaUserShield className="text-amber-400/60" />
              <span className="font-medium">Admin Panel</span>
            </Link>
          )}

          {/* Mobile Divider */}
          <div className="my-3 border-t border-white/10"></div>

          {/* Mobile Auth Section */}
          {user ? (
            <div className="space-y-2">
              <Link
                to="/profile"
                onClick={closeMenu}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.username || "User"}
                    className="h-8 w-8 rounded-full object-cover border border-green-500/30"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-600 to-green-400 flex items-center justify-center text-xs font-bold text-white">
                    {user.username?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
                <span className="font-medium">{user.username || user.fullName || "User"}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
              >
                <FaSignOutAlt />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          ) : (
            <div className="space-y-2">
              <Link
                to="/login"
                onClick={closeMenu}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-green-400 hover:text-green-300 hover:bg-green-500/10 transition-all duration-200"
              >
                <FaSignInAlt />
                <span className="font-medium">Login</span>
              </Link>
              <Link
                to="/signup"
                onClick={closeMenu}
                className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-400 hover:text-green-300 transition-all duration-200 border border-green-500/20"
              >
                <FaUserPlus />
                <span className="font-medium">Sign Up</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;