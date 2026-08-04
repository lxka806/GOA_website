import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../hooks/useAuth";
import { 
  FaUser, 
  FaEnvelope, 
  FaGlobe, 
  FaGithub, 
  FaLink, 
  FaEdit, 
  FaCamera,
  FaTimes,
  FaCheckCircle,
  FaTrophy,
  FaStar,
  FaCode,
  FaBriefcase
} from "react-icons/fa";
import { GiBoxingGlove } from "react-icons/gi";

function Profile() {
    const { user, setUser } = useAuth();

    const [profile, setProfile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        bio: "",
        country: "",
        github: "",
        portfolio: ""
    });
    const [image, setImage] = useState(null);
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        api.get("/api/user/profile")
            .then(data => {
                setProfile(data.user);
                setFormData({
                    fullName: data.user.fullName || "",
                    username: data.user.username || "",
                    email: data.user.email || "",
                    bio: data.user.bio || "",
                    country: data.user.country || "",
                    github: data.user.github || "",
                    portfolio: data.user.portfolio || ""
                });
            })
            .catch(err => {
                setMessage(err.message);
            });
    }, []);

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const updateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const data = await api.put("/api/user/profile", formData);
            setProfile(data.user);
            setUser(data.user);
            setMessage("Profile updated successfully.");
            setIsEditing(false);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const uploadAvatar = async () => {
        if (!image) return;
        setIsLoading(true);
        try {
            const avatarData = new FormData();
            avatarData.append("avatar", image);

            const data = await api.post("/api/user/avatar", avatarData);

            setProfile(prev => ({
                ...prev,
                avatar: data.avatar
            }));
            setImagePreview(null);
            setImage(null);
            setMessage("Avatar updated successfully.");
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!profile) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 text-sm">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#050505] text-white px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-6xl mx-auto">

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="bg-green-600/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-green-500/30">
                            <FaUser className="text-2xl sm:text-3xl text-green-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                                My <span className="text-green-500">Profile</span>
                            </h1>
                            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                                Manage your account and preferences
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className={`
                            inline-flex items-center gap-2
                            ${isEditing 
                                ? 'bg-red-600 hover:bg-red-700' 
                                : 'bg-gradient-to-r from-green-600 to-green-500 hover:shadow-2xl hover:shadow-green-500/30'
                            }
                            px-4 sm:px-6 py-2 sm:py-2.5 
                            rounded-lg sm:rounded-xl text-sm font-semibold
                            transition-all duration-300 hover:scale-105
                        `}
                    >
                        {isEditing ? (
                            <>
                                <FaTimes />
                                Cancel
                            </>
                        ) : (
                            <>
                                <FaEdit />
                                Edit Profile
                            </>
                        )}
                    </button>
                </div>

                {/* Message */}
                {message && (
                    <div className={`mb-4 sm:mb-6 border rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 text-sm ${
                        message.includes("success") 
                            ? 'bg-green-950/50 border-green-500/30 text-green-300' 
                            : 'bg-red-950/50 border-red-500/30 text-red-300'
                    }`}>
                        <span className="text-xl">{message.includes("success") ? '✓' : '⚠'}</span>
                        <span className="flex-1">{message}</span>
                        <button onClick={() => setMessage("")} className="hover:opacity-70 transition-opacity">
                            <FaTimes />
                        </button>
                    </div>
                )}

                {/* Profile Card */}
                <div className="bg-white/[0.04] border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-6 lg:p-8 backdrop-blur-xl">

                    {/* Avatar Section */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-8">
                        <div className="relative group">
                            <img
                                src={imagePreview || profile.avatar || "https://via.placeholder.com/150x150/1a1a1a/4ade80?text=GOA"}
                                alt={profile.fullName}
                                className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full object-cover border-4 border-green-500 shadow-xl shadow-green-500/10"
                            />
                            <label className="absolute bottom-0 right-0 bg-green-600 hover:bg-green-700 p-2 rounded-full cursor-pointer transition-all duration-300 hover:scale-110 border-2 border-black">
                                <FaCamera className="text-sm text-white" />
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImage}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="text-center sm:text-left">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                                {profile.fullName}
                            </h2>
                            <p className="text-green-400 text-base sm:text-lg font-mono">
                                @{profile.username}
                            </p>
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                                <span className="flex items-center gap-1 text-gray-400 text-sm">
                                    <FaEnvelope className="text-gray-500 text-xs" />
                                    {profile.email}
                                </span>
                                {profile.country && (
                                    <span className="flex items-center gap-1 text-gray-400 text-sm">
                                        <FaGlobe className="text-gray-500 text-xs" />
                                        {profile.country}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Avatar Upload Button (shows when image selected) */}
                        {image && (
                            <div className="sm:ml-auto flex flex-col items-center gap-2">
                                <button
                                    onClick={uploadAvatar}
                                    disabled={isLoading}
                                    className="
                                        bg-gradient-to-r from-green-600 to-green-500 
                                        px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold
                                        hover:shadow-2xl hover:shadow-green-500/30
                                        transition-all duration-300 hover:scale-105
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    "
                                >
                                    {isLoading ? 'Uploading...' : 'Upload Avatar'}
                                </button>
                                <button
                                    onClick={() => {
                                        setImage(null);
                                        setImagePreview(null);
                                    }}
                                    className="text-gray-500 text-xs hover:text-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8">
                        <div className="bg-black/40 rounded-xl p-4 text-center border border-white/5">
                            <p className="text-2xl sm:text-3xl font-bold text-green-400">{profile.level || "N/A"}</p>
                            <p className="text-gray-400 text-xs mt-1">Level</p>
                        </div>
                        <div className="bg-black/40 rounded-xl p-4 text-center border border-white/5">
                            <p className="text-2xl sm:text-3xl font-bold text-purple-400">{profile.role || "User"}</p>
                            <p className="text-gray-400 text-xs mt-1">Role</p>
                        </div>
                        {profile.type === "mma" && (
                            <div className="bg-black/40 rounded-xl p-4 text-center border border-red-500/20">
                                <p className="text-2xl sm:text-3xl font-bold text-red-400">
                                    <GiBoxingGlove className="inline" />
                                </p>
                                <p className="text-gray-400 text-xs mt-1">MMA Fighter</p>
                            </div>
                        )}
                    </div>

                    {/* Social Links */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                            <h3 className="text-gray-400 text-sm flex items-center gap-2">
                                <FaGithub className="text-gray-500" />
                                GitHub
                            </h3>
                            {profile.github ? (
                                <a 
                                    href={profile.github.startsWith("http") ? profile.github : `https://${profile.github}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-green-400 hover:text-green-300 transition-colors text-sm break-all mt-1 block"
                                >
                                    {profile.github}
                                </a>
                            ) : (
                                <p className="text-gray-500 text-sm mt-1">Not added</p>
                            )}
                        </div>
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5">
                            <h3 className="text-gray-400 text-sm flex items-center gap-2">
                                <FaLink className="text-gray-500" />
                                Portfolio
                            </h3>
                            {profile.portfolio ? (
                                <a 
                                    href={profile.portfolio.startsWith("http") ? profile.portfolio : `https://${profile.portfolio}`} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-green-400 hover:text-green-300 transition-colors text-sm break-all mt-1 block"
                                >
                                    {profile.portfolio}
                                </a>
                            ) : (
                                <p className="text-gray-500 text-sm mt-1">Not added</p>
                            )}
                        </div>
                    </div>

                    {/* Bio */}
                    {profile.bio && (
                        <div className="bg-black/40 rounded-xl p-4 border border-white/5 mb-6">
                            <h3 className="text-gray-400 text-sm mb-2">Bio</h3>
                            <p className="text-gray-300 text-sm leading-relaxed">{profile.bio}</p>
                        </div>
                    )}

                    {/* Edit Form */}
                    {isEditing && (
                        <form onSubmit={updateProfile} className="mt-6 bg-black/40 rounded-2xl border border-white/10 p-5 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
                                <FaEdit className="text-green-400" />
                                Edit Profile
                            </h3>
                            <div className="grid gap-4 sm:grid-cols-2">
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Full Name</label>
                                    <input
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Username</label>
                                    <input
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Email</label>
                                    <input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Country</label>
                                    <input
                                        name="country"
                                        value={formData.country}
                                        onChange={handleInputChange}
                                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">GitHub</label>
                                    <input
                                        name="github"
                                        value={formData.github}
                                        onChange={handleInputChange}
                                        placeholder="username or full URL"
                                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Portfolio</label>
                                    <input
                                        name="portfolio"
                                        value={formData.portfolio}
                                        onChange={handleInputChange}
                                        placeholder="website.com"
                                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all"
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label className="block text-xs sm:text-sm text-gray-400 mb-1.5">Bio</label>
                                    <textarea
                                        name="bio"
                                        value={formData.bio}
                                        onChange={handleInputChange}
                                        rows="3"
                                        placeholder="Tell us about yourself..."
                                        className="w-full rounded-lg border border-white/10 bg-black/40 px-3 sm:px-4 py-2 sm:py-2.5 text-white text-sm outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/50 transition-all resize-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 mt-5">
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="
                                        bg-gradient-to-r from-green-600 to-green-500 
                                        px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm font-semibold
                                        hover:shadow-2xl hover:shadow-green-500/30
                                        transition-all duration-300 hover:scale-105
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    "
                                >
                                    {isLoading ? 'Saving...' : 'Save Profile'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="border border-white/10 px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}

                    {/* Avatar Upload Section (always visible) */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                            <FaCamera className="text-green-400" />
                            Change Avatar
                        </h3>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImage}
                                className="text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-600/20 file:text-green-400 hover:file:bg-green-600/30 cursor-pointer"
                            />
                            {image && (
                                <span className="text-xs text-gray-500">
                                    {image.name} ({(image.size / 1024).toFixed(0)} KB)
                                </span>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Profile;