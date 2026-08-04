import { useEffect, useState } from "react";
import { api } from "../api";
import { useAuth } from "../hooks/useAuth";
import { 
  FaPlus, 
  FaTrash, 
  FaThumbsUp, 
  FaComment, 
  FaUser, 
  FaCalendarAlt,
  FaImage,
  FaTimes,
  FaReply,
  FaExpand
} from "react-icons/fa";
import { GiBoxingGlove } from "react-icons/gi";
import { HiOutlineUsers } from "react-icons/hi";

function Posts() {
    const { user, loading } = useAuth();

    const [posts, setPosts] = useState([]);
    const [message, setMessage] = useState("");
    const [commentInputs, setCommentInputs] = useState({});
    const [showCreateForm, setShowCreateForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const [form, setForm] = useState({
        title: "",
        content: "",
        image: null,
    });

    // Fetch posts on mount
    useEffect(() => {
        api
        .get("/api/posts")
        .then((data) => setPosts(data))
        .catch((err) => setMessage(err.message));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleImage = (e) => {
        const file = e.target.files[0];
        if (file) {
            setForm((prev) => ({ ...prev, image: file }));
        }
    };

    // Submit new post
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("content", form.content);

            if (form.image) {
                formData.append("image", form.image);
            }

            const data = await api.post("/api/posts", formData);

            setPosts((prev) => [data.post || data, ...prev]);
            setForm({ title: "", content: "", image: null });
            setShowCreateForm(false);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Delete post
    const handleDeletePost = async (postId) => {
        if (!window.confirm("Are you sure you want to delete this post?")) return;
        try {
            await api.del(`/api/posts/${postId}`);
            setPosts((prev) => prev.filter((p) => (p._id || p.id) !== postId));
        } catch (error) {
            setMessage(error.message);
        }
    };

    // Toggle Like
    const handleLike = async (postId) => {
        try {
            const result = await api.put(`/api/posts/${postId}/like`);

            setPosts((prev) =>
                prev.map((post) => {
                    if ((post._id || post.id) === postId) {
                        return {
                            ...post,
                            likesCount: result.likes,
                            likes: new Array(result.likes).fill(null),
                        };
                    }
                    return post;
                })
            );
        } catch (error) {
            setMessage(error.message);
        }
    };

    // Add Comment
    const handleAddComment = async (e, postId) => {
        e.preventDefault();
        const content = commentInputs[postId];
        if (!content?.trim()) return;

        try {
            const newComment = await api.post(`/api/posts/${postId}/comments`, { content });

            setPosts((prev) =>
                prev.map((post) => {
                    if ((post._id || post.id) === postId) {
                        return {
                            ...post,
                            comments: [...(post.comments || []), newComment],
                        };
                    }
                    return post;
                })
            );

            setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
        } catch (error) {
            setMessage(error.message);
        }
    };

    // Delete Comment
    const handleDeleteComment = async (postId, commentId) => {
        if (!window.confirm("Delete this comment?")) return;
        try {
            await api.del(`/api/posts/${postId}/comments/${commentId}`);

            setPosts((prev) =>
                prev.map((post) => {
                    if ((post._id || post.id) === postId) {
                        return {
                            ...post,
                            comments: post.comments.filter((c) => (c._id || c.id) !== commentId),
                        };
                    }
                    return post;
                })
            );
        } catch (error) {
            setMessage(error.message);
        }
    };

    // Format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-400 text-sm">Loading posts...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-[#050505] text-white px-3 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-5xl mx-auto">

                {/* Image Lightbox */}
                {selectedImage && (
                    <div 
                        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-pointer"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button 
                            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl transition-colors"
                            onClick={() => setSelectedImage(null)}
                        >
                            <FaTimes />
                        </button>
                        <img 
                            src={selectedImage} 
                            alt="Full size" 
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                    </div>
                )}

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 sm:gap-4">
                        <div className="bg-green-600/20 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-green-500/30">
                            <HiOutlineUsers className="text-2xl sm:text-3xl text-green-500" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                                Community <span className="text-green-500">Posts</span>
                            </h1>
                            <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                                Share and connect with the GOA community
                            </p>
                        </div>
                    </div>

                    {user && (
                        <button
                            onClick={() => setShowCreateForm(!showCreateForm)}
                            className={`
                                inline-flex items-center gap-2
                                ${showCreateForm 
                                    ? 'bg-red-600 hover:bg-red-700' 
                                    : 'bg-gradient-to-r from-green-600 to-green-500 hover:shadow-2xl hover:shadow-green-500/30'
                                }
                                px-4 sm:px-6 py-2 sm:py-2.5 
                                rounded-lg sm:rounded-xl text-sm font-semibold
                                transition-all duration-300 hover:scale-105
                            `}
                        >
                            {showCreateForm ? (
                                <>
                                    <FaTimes />
                                    Cancel
                                </>
                            ) : (
                                <>
                                    <FaPlus />
                                    New Post
                                </>
                            )}
                        </button>
                    )}
                </div>

                {/* Message */}
                {message && (
                    <div className="mb-4 sm:mb-6 bg-red-950/50 border border-red-500/30 rounded-xl p-3 sm:p-4 flex items-center gap-2 sm:gap-3 text-red-300 text-sm">
                        <span className="text-xl">⚠</span>
                        <span className="flex-1">{message}</span>
                        <button onClick={() => setMessage("")} className="text-red-400 hover:text-red-300">
                            <FaTimes />
                        </button>
                    </div>
                )}

                {/* Create Post Form */}
                {showCreateForm && user?.role === "admin" && (
                    <div className="mb-6 sm:mb-8 bg-white/[0.04] border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 lg:p-8">
                        <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
                            <FaPlus className="text-green-400" />
                            Create New Post
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <input
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                required
                                placeholder="Post title..."
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 outline-none transition-all"
                            />
                            <textarea
                                name="content"
                                value={form.content}
                                onChange={handleChange}
                                required
                                rows="5"
                                placeholder="What's on your mind?"
                                className="w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white placeholder:text-gray-600 focus:border-green-500 focus:ring-1 focus:ring-green-500/50 outline-none transition-all resize-none"
                            />
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                                <label className="flex items-center gap-2 cursor-pointer bg-white/5 border border-white/10 rounded-xl px-4 py-2 hover:bg-white/10 transition-colors">
                                    <FaImage className="text-gray-400" />
                                    <span className="text-sm text-gray-400">Add Image</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImage}
                                        className="hidden"
                                    />
                                </label>
                                {form.image && (
                                    <span className="text-sm text-green-400">
                                        {form.image.name}
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="
                                        bg-gradient-to-r from-green-600 to-green-500 
                                        px-6 py-2.5 rounded-xl text-sm font-semibold
                                        hover:shadow-2xl hover:shadow-green-500/30
                                        transition-all duration-300 hover:scale-105
                                        disabled:opacity-50 disabled:cursor-not-allowed
                                    "
                                >
                                    {isSubmitting ? 'Publishing...' : 'Publish Post'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowCreateForm(false)}
                                    className="border border-white/10 px-6 py-2.5 rounded-xl text-sm hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Posts List */}
                {posts.length === 0 ? (
                    <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 sm:p-12 text-center">
                        <div className="flex flex-col items-center gap-4">
                            <div className="text-6xl text-gray-600">📄</div>
                            <h3 className="text-xl sm:text-2xl font-semibold">No Posts Yet</h3>
                            <p className="text-gray-400 text-sm max-w-md">
                                Be the first to share something with the community!
                            </p>
                            {user?.role === "admin" && (
                                <button
                                    onClick={() => setShowCreateForm(true)}
                                    className="
                                        inline-flex items-center gap-2
                                        bg-green-600 px-6 py-3 rounded-xl text-sm font-semibold
                                        hover:bg-green-700 hover:shadow-lg hover:shadow-green-500/25
                                        transition-all duration-300
                                    "
                                >
                                    <FaPlus />
                                    Create First Post
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid gap-5 sm:gap-6">
                        {posts.map((post) => {
                            const postId = post._id || post.id;
                            const isPostAuthor = user && (user._id || user.id) === (post.author?._id || post.author);
                            const isAdmin = user?.role === "admin";
                            const commentCount = post.comments?.length || 0;

                            return (
                                <div
                                    key={postId}
                                    className="
                                        bg-white/[0.04] backdrop-blur-lg 
                                        border border-white/10 rounded-xl sm:rounded-2xl 
                                        overflow-hidden
                                        hover:bg-white/[0.06] hover:border-white/20
                                        transition-all duration-300
                                    "
                                >
                                    {/* Image - Fixed visibility */}
                                    {post.image && (
                                        <div className="relative w-full bg-black/40">
                                            <div className="relative" style={{ maxHeight: '500px' }}>
                                                <img
                                                    src={post.image}
                                                    alt={post.title}
                                                    className="w-full h-auto max-h-[500px] object-contain bg-black/60"
                                                    style={{ minHeight: '200px' }}
                                                />
                                                {/* Gradient overlay for better text visibility */}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
                                                
                                                {/* Expand button */}
                                                <button
                                                    onClick={() => setSelectedImage(post.image)}
                                                    className="
                                                        absolute bottom-4 right-4
                                                        bg-black/60 hover:bg-black/80
                                                        backdrop-blur-sm
                                                        p-2 rounded-lg
                                                        text-white/70 hover:text-white
                                                        transition-all duration-200
                                                        border border-white/10
                                                        group
                                                    "
                                                    title="View full size"
                                                >
                                                    <FaExpand className="text-sm group-hover:scale-110 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-5 sm:p-6 lg:p-8">
                                        {/* Header */}
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                                                    {post.title}
                                                </h2>
                                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-1.5 text-xs sm:text-sm text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <FaUser className="text-green-400 text-xs" />
                                                        {post.author?.username || post.author?.fullName || "Author"}
                                                    </span>
                                                    <span className="hidden xs:inline">•</span>
                                                    <span className="flex items-center gap-1 hidden xs:flex">
                                                        <FaCalendarAlt className="text-gray-500 text-xs" />
                                                        {formatDate(post.createdAt)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Delete Button */}
                                            {(isPostAuthor || isAdmin) && (
                                                <button
                                                    onClick={() => handleDeletePost(postId)}
                                                    className="
                                                        flex-shrink-0
                                                        text-red-400 hover:text-red-300 
                                                        p-2 rounded-lg hover:bg-red-500/10
                                                        transition-all duration-200
                                                        group
                                                    "
                                                    title="Delete post"
                                                >
                                                    <FaTrash className="text-sm group-hover:scale-110 transition-transform" />
                                                </button>
                                            )}
                                        </div>

                                        {/* Content */}
                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed mt-3 whitespace-pre-wrap">
                                            {post.content}
                                        </p>

                                        {/* Actions */}
                                        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 pt-4 border-t border-white/10">
                                            {/* Like Button */}
                                            <button
                                                onClick={() => handleLike(postId)}
                                                className="
                                                    inline-flex items-center gap-1.5
                                                    bg-white/5 hover:bg-white/10
                                                    px-3 sm:px-4 py-1.5 sm:py-2 
                                                    rounded-lg text-sm font-medium
                                                    transition-all duration-200
                                                    hover:scale-105
                                                "
                                            >
                                                <FaThumbsUp className="text-green-400" />
                                                <span>{post.likesCount ?? post.likes?.length ?? 0}</span>
                                            </button>

                                            {/* Comment Count */}
                                            <span className="flex items-center gap-1.5 text-gray-400 text-sm">
                                                <FaComment className="text-blue-400" />
                                                <span>{commentCount} {commentCount === 1 ? 'comment' : 'comments'}</span>
                                            </span>

                                            {/* Post Type Badge */}
                                            {post.type === "mma" && (
                                                <span className="ml-auto flex items-center gap-1 bg-red-600/20 text-red-400 px-2.5 py-1 rounded-full text-[10px] font-medium border border-red-500/30">
                                                    <GiBoxingGlove className="text-xs" />
                                                    MMA
                                                </span>
                                            )}
                                        </div>

                                        {/* Comments Section */}
                                        <div className="mt-5 pt-4 border-t border-white/10">
                                            <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                                                <FaComment className="text-blue-400" />
                                                Comments
                                            </h3>

                                            {/* Comment List */}
                                            <div className="space-y-2.5 mb-4 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-white/10">
                                                {post.comments?.length > 0 ? (
                                                    post.comments.map((comment) => {
                                                        const commentId = comment._id || comment.id;
                                                        const isCommentAuthor =
                                                            user && (user._id || user.id) === (comment.author?._id || comment.author);

                                                        return (
                                                            <div
                                                                key={commentId}
                                                                className="bg-black/30 rounded-lg p-3 flex items-start justify-between gap-2 group"
                                                            >
                                                                <div className="flex-1 min-w-0">
                                                                    <p className="font-semibold text-xs text-green-400">
                                                                        {comment.author?.username || comment.author?.fullName || "User"}
                                                                    </p>
                                                                    <p className="text-gray-300 text-sm mt-0.5 break-words">
                                                                        {comment.content}
                                                                    </p>
                                                                    <p className="text-gray-500 text-[10px] mt-1">
                                                                        {formatDate(comment.createdAt)}
                                                                    </p>
                                                                </div>

                                                                {(isCommentAuthor || isAdmin) && (
                                                                    <button
                                                                        onClick={() => handleDeleteComment(postId, commentId)}
                                                                        className="
                                                                            flex-shrink-0
                                                                            text-red-400/50 hover:text-red-400 
                                                                            p-1 rounded
                                                                            transition-all duration-200
                                                                            opacity-0 group-hover:opacity-100
                                                                        "
                                                                        title="Delete comment"
                                                                    >
                                                                        <FaTrash className="text-xs" />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        );
                                                    })
                                                ) : (
                                                    <p className="text-gray-500 text-sm text-center py-2">
                                                        No comments yet. Be the first!
                                                    </p>
                                                )}
                                            </div>

                                            {/* Add Comment */}
                                            {user && (
                                                <form
                                                    onSubmit={(e) => handleAddComment(e, postId)}
                                                    className="flex gap-2"
                                                >
                                                    <input
                                                        type="text"
                                                        placeholder="Write a comment..."
                                                        value={commentInputs[postId] || ""}
                                                        onChange={(e) =>
                                                            setCommentInputs({
                                                                ...commentInputs,
                                                                [postId]: e.target.value,
                                                            })
                                                        }
                                                        className="
                                                            flex-1 rounded-lg 
                                                            border border-white/10 bg-black/40 
                                                            px-3 py-2 text-sm text-white 
                                                            placeholder:text-gray-600
                                                            focus:border-green-500 focus:ring-1 focus:ring-green-500/50
                                                            outline-none transition-all
                                                        "
                                                    />
                                                    <button
                                                        type="submit"
                                                        className="
                                                            bg-gradient-to-r from-blue-600 to-blue-500 
                                                            px-4 py-2 rounded-lg text-sm font-semibold
                                                            hover:shadow-lg hover:shadow-blue-500/25
                                                            transition-all duration-300 hover:scale-105
                                                            whitespace-nowrap
                                                        "
                                                    >
                                                        <FaReply className="inline mr-1" />
                                                        Reply
                                                    </button>
                                                </form>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Posts;