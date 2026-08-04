import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../hooks/useAuth";
import { FaUserShield, FaUsers, FaUserCog } from "react-icons/fa";
import { HiOutlineUsers, HiOutlineUserGroup } from "react-icons/hi";

function Admin() {
    const { user, loading } = useAuth();

    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        if (user?.role === "admin") {
            api.get("/api/admin/users")
                .then((data) => setUsers(data))
                .catch((err) => setMessage(err.message));
        }
    }, [user]);

    // Filter users based on search
    const filteredUsers = users.filter(u => 
        u.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 text-sm sm:text-base">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center max-w-sm sm:max-w-md w-full">
                    <FaUserShield className="text-5xl sm:text-6xl text-gray-600 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Access Denied</h2>
                    <p className="text-gray-400 text-sm sm:text-base">You must login as admin to access this page.</p>
                </div>
            </div>
        );
    }

    if (user.role !== "admin") {
        return (
            <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-4">
                <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-center max-w-sm sm:max-w-md w-full">
                    <FaUserShield className="text-5xl sm:text-6xl text-red-500 mx-auto mb-4" />
                    <h2 className="text-xl sm:text-2xl font-bold mb-2">Unauthorized</h2>
                    <p className="text-gray-400 text-sm sm:text-base">Admin access required to view this page.</p>
                </div>
            </div>
        );
    }

    const adminCount = users.filter(u => u.role === "admin").length;

    return (
        <section className="min-h-screen bg-[#050505] text-white px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
            <div className="max-w-7xl mx-auto">

                {/* Header - Mobile Optimized */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-12">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="bg-green-600/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-green-500/30 flex-shrink-0">
                            <FaUserShield className="text-2xl sm:text-3xl text-green-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight">
                                Admin <span className="text-green-500">Panel</span>
                            </h1>
                            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                                GOA Academy • User Management
                            </p>
                        </div>
                    </div>
                    <div className="sm:ml-auto">
                        <span className="bg-green-600/20 text-green-400 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium border border-green-500/30 inline-block">
                            👤 {user.username}
                        </span>
                    </div>
                </div>

                {/* Message */}
                {message && (
                    <div className="bg-red-950/50 border border-red-500/30 text-red-300 rounded-xl sm:rounded-2xl p-3 sm:p-4 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
                        <span className="text-xl sm:text-2xl">⚠️</span>
                        <span className="flex-1">{message}</span>
                    </div>
                )}

                {/* Stats - Mobile: Single column, Tablet: 2 columns, Desktop: 3 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12">
                    <div className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-white/[0.06] transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <FaUsers className="text-2xl sm:text-3xl text-green-500" />
                                <span className="text-xs text-gray-600 font-mono hidden sm:inline">LIVE</span>
                            </div>
                            <span className="text-[10px] sm:text-xs text-gray-600 font-mono bg-white/5 px-2 py-0.5 rounded">LIVE</span>
                        </div>
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 tracking-tight">
                            {users.length}
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">Total Users</p>
                        <div className="mt-2 sm:mt-3 h-0.5 sm:h-1 w-12 sm:w-16 bg-green-500/30 rounded-full"></div>
                    </div>

                    <div className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-white/[0.06] transition-all duration-300">
                        <div className="flex items-start justify-between">
                            <FaUserShield className="text-2xl sm:text-3xl text-amber-400" />
                            <span className="text-[10px] sm:text-xs text-gray-600 font-mono bg-white/5 px-2 py-0.5 rounded">ROLE</span>
                        </div>
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 tracking-tight">
                            {adminCount}
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">Admins</p>
                        <div className="mt-2 sm:mt-3 h-0.5 sm:h-1 w-12 sm:w-16 bg-amber-500/30 rounded-full"></div>
                    </div>

                    <div className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl p-4 sm:p-5 lg:p-6 hover:bg-white/[0.06] transition-all duration-300 sm:col-span-2 lg:col-span-1">
                        <div className="flex items-start justify-between">
                            <FaUserCog className="text-2xl sm:text-3xl text-blue-400" />
                            <span className="text-[10px] sm:text-xs text-gray-600 font-mono bg-white/5 px-2 py-0.5 rounded">STATUS</span>
                        </div>
                        <p className="text-3xl sm:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 tracking-tight text-green-400">
                            Active
                        </p>
                        <p className="text-gray-400 text-xs sm:text-sm mt-1">System Running</p>
                        <div className="mt-2 sm:mt-3 h-0.5 sm:h-1 w-12 sm:w-16 bg-green-500/30 rounded-full"></div>
                    </div>
                </div>

                {/* Users Table - Mobile Optimized */}
                <div className="bg-white/[0.04] border border-white/10 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden">
                    {/* Table Header with Search */}
                    <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                            <h2 className="text-lg sm:text-xl font-bold">Registered Users</h2>
                            <p className="text-gray-400 text-xs sm:text-sm hidden sm:block">Manage all users in the system</p>
                        </div>
                        <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2 w-full sm:w-auto">
                            {/* Search Input */}
                            <div className="relative flex-1 sm:flex-none">
                                <input
                                    type="text"
                                    placeholder="Search users..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full sm:w-48 lg:w-56 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 sm:px-4 sm:py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500/50 transition-colors"
                                />
                                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-xs">🔍</span>
                            </div>
                            <span className="bg-green-600/20 text-green-400 px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap text-center">
                                {filteredUsers.length} found
                            </span>
                        </div>
                    </div>

                    {/* Mobile Card View - Visible on small screens */}
                    <div className="block sm:hidden divide-y divide-white/5">
                        {filteredUsers.length > 0 ? (
                            filteredUsers.map((userItem) => (
                                <div key={userItem._id} className="px-4 py-3 hover:bg-white/5 transition-colors">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-sm truncate">{userItem.fullName || '—'}</p>
                                            <p className="text-green-400 text-xs font-mono mt-0.5">@{userItem.username}</p>
                                            {userItem.email && (
                                                <p className="text-gray-500 text-xs truncate mt-0.5">{userItem.email}</p>
                                            )}
                                        </div>
                                        <span className={`
                                            inline-flex items-center gap-1
                                            px-2 py-1 rounded-full text-[10px] font-medium flex-shrink-0 ml-2
                                            ${userItem.role === 'admin' 
                                                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                                                : 'bg-green-600/20 text-green-400 border border-green-500/30'
                                            }
                                        `}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${
                                                userItem.role === 'admin' ? 'bg-amber-400' : 'bg-green-400'
                                            }`}></span>
                                            {userItem.role}
                                        </span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="py-8 text-center text-gray-500">
                                <div className="flex flex-col items-center gap-2">
                                    <HiOutlineUsers className="text-3xl text-gray-600" />
                                    <p className="text-sm">No users found</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Desktop Table View - Hidden on mobile */}
                    <div className="hidden sm:block overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/[0.02]">
                                    <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                                        Full Name
                                    </th>
                                    <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                                        Username
                                    </th>
                                    <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider hidden md:table-cell">
                                        Email
                                    </th>
                                    <th className="text-left py-3 sm:py-4 px-4 sm:px-6 text-gray-400 text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                                        Role
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((userItem, index) => (
                                        <tr
                                            key={userItem._id}
                                            className={`border-b border-white/5 hover:bg-white/[0.06] transition-colors duration-200 ${
                                                index % 2 === 0 ? 'bg-white/[0.01]' : ''
                                            }`}
                                        >
                                            <td className="py-3 sm:py-4 px-4 sm:px-6 font-medium text-sm sm:text-base truncate max-w-[120px] sm:max-w-[200px]">
                                                {userItem.fullName || '—'}
                                            </td>
                                            <td className="py-3 sm:py-4 px-4 sm:px-6">
                                                <span className="text-green-400 font-mono text-xs sm:text-sm">
                                                    @{userItem.username}
                                                </span>
                                            </td>
                                            <td className="py-3 sm:py-4 px-4 sm:px-6 text-gray-300 text-xs sm:text-sm hidden md:table-cell truncate max-w-[150px]">
                                                {userItem.email || '—'}
                                            </td>
                                            <td className="py-3 sm:py-4 px-4 sm:px-6">
                                                <span className={`
                                                    inline-flex items-center gap-1 sm:gap-1.5
                                                    px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium
                                                    ${userItem.role === 'admin' 
                                                        ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                                                        : 'bg-green-600/20 text-green-400 border border-green-500/30'
                                                    }
                                                `}>
                                                    <span className={`w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full ${
                                                        userItem.role === 'admin' ? 'bg-amber-400' : 'bg-green-400'
                                                    }`}></span>
                                                    {userItem.role}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-8 sm:py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center gap-2">
                                                <HiOutlineUserGroup className="text-3xl sm:text-4xl text-gray-600" />
                                                <p className="text-sm sm:text-base">
                                                    {searchTerm ? 'No users match your search' : 'No users registered yet'}
                                                </p>
                                                {searchTerm && (
                                                    <button 
                                                        onClick={() => setSearchTerm('')}
                                                        className="text-green-400 text-xs hover:text-green-300 transition"
                                                    >
                                                        Clear search →
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Footer */}
                    <div className="px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-white/[0.01]">
                        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-2">
                            <p className="text-gray-500 text-[10px] sm:text-xs">
                                Showing {filteredUsers.length} of {users.length} {users.length === 1 ? 'user' : 'users'}
                            </p>
                            <p className="text-gray-500 text-[10px] sm:text-xs">
                                Updated: {new Date().toLocaleString()}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Admin;