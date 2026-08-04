const mongoose = require("mongoose");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const Project = require("../models/Project");

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required."
            });
        }

        const post = await Post.create({
            title,
            content,
            image: req.file ? req.file.path : "",
            author: req.user._id
        });

        res.status(201).json({
            message: "Post created successfully.",
            post
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username fullName role")
      .populate({ path: "comments", populate: { path: "author", select: "username fullName" } })
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username fullName role")
      .populate({ path: "comments", populate: { path: "author", select: "username fullName" } });

    if (!post) return res.status(404).json({ message: "Post not found." });

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    await Post.findByIdAndDelete(req.params.id);

    res.json({ message: "Post deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Comment content is required." });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    const comment = await Comment.create({
      content,
      author: req.user && (req.user.id || req.user._id),
      post: post._id,
      onModel: "Post",
    });

    post.comments.push(comment._id);
    await post.save();

    const populated = await comment.populate("author", "username fullName");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found." });

    const userId = req.user && (req.user.id || req.user._id);
    if (!userId) return res.status(401).json({ message: "Authentication required." });

    // Normalize likes to an array and remove any invalid entries (pre-existing bad data)
    if (!Array.isArray(post.likes)) {
      post.likes = [];
    } else {
      post.likes = post.likes.filter((id) => mongoose.Types.ObjectId.isValid(id));
    }

    const alreadyLiked = post.likes.some((id) => id.toString() === userId.toString());

    if (alreadyLiked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    res.json({ likes: post.likes.length, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found." });

    // Only comment author or admin can delete
    const userId = req.user && (req.user.id || req.user._id);
    if (!userId) return res.status(401).json({ message: "Authentication required." });

    const isAuthor = comment.author && comment.author.toString() === userId.toString();
    const isAdmin = req.user && req.user.role === "admin";

    if (!isAuthor && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to delete this comment." });
    }

    // Remove comment reference from the appropriate parent (Post or Project)
    if (comment.onModel === "Post") {
      const post = await Post.findById(postId);
      if (post) {
        post.comments = post.comments.filter((id) => id.toString() !== commentId.toString());
        await post.save();
      }
    } else if (comment.onModel === "Project") {
      const project = await Project.findById(postId);
      if (project) {
        project.comments = project.comments.filter((id) => id.toString() !== commentId.toString());
        await project.save();
      }
    }

    await Comment.findByIdAndDelete(commentId);

    res.json({ message: "Comment deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  addComment,
  likePost,
  deleteComment
};
