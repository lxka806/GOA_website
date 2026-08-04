const express = require("express");
const router = express.Router();
const protect = require("../middleware/protect");
const upload = require("../middleware/upload");

const {
    createProject,
    getProjects,
    getProjectById,
    updateProject,
    deleteProject,
    likeProject,
    addCommentToProject,
} = require("../controllers/project.controller");
const { deleteComment } = require("../controllers/post.controller");

router.get("/", getProjects);
router.get("/:id", getProjectById);

router.post("/", protect, upload.single("image"), createProject);
router.put("/:id", protect, upload.single("image"), updateProject);
router.delete("/:id", protect, deleteProject);

router.post("/:id/like", protect, likeProject);
router.post("/:id/comments", protect, addCommentToProject);
router.delete("/:postId/comments/:commentId", protect, deleteComment);

module.exports = router;
