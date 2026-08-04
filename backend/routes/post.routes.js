const express = require("express");
const router = express.Router();

const protect = require("../middleware/protect");
const adminOnly = require("../middleware/admin");
const upload = require("../middleware/upload")

const {
    createPost,
    getPosts,
    getPostById,
    deletePost,
    addComment,
    likePost,
    deleteComment,
} = require("../controllers/post.controller");

// Public: list and view
router.get("/", getPosts);
router.get("/:id", getPostById);

// Admin-only create and delete
router.post("/", protect, upload.single("image"), adminOnly, createPost);
router.delete("/:id", protect, adminOnly, deletePost);
router.put("/:id", protect, adminOnly, upload.single("image"), createPost);

// Protected actions for authenticated users
router.post("/:id/comments", protect, addComment);
router.post("/:id/like", protect, likePost);
router.delete("/:postId/comments/:commentId", protect, deleteComment);
// Accept PUT as well for clients that use PUT to toggle likes
router.put("/:id/like", protect, likePost);

module.exports = router;
