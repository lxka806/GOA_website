const mongoose = require("mongoose");
const Project = require("../models/Project");
const Comment = require("../models/Comment");

const createProject = async (req, res) => {
  try {
    const { title, description, github, liveDemo, technologies } = req.body;
    if (!title) return res.status(400).json({ message: "Title is required." });

    const project = await Project.create({
    title,
    description,
    image: req.file ? req.file.path : "",
    github,
    liveDemo,
    technologies: technologies 
        ? (Array.isArray(technologies) 
            ? technologies 
            : technologies.split(",").map(t => t.trim()))
        : [],
    author: req.user._id,
    approved: true,
});

    res.status(201).json({ message: "Project created.", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjects = async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === "admin";

    // Non-admins should see approved projects, but also their own projects
    let filter;
    if (isAdmin) {
      filter = {};
    } else if (req.user) {
      filter = { $or: [{ approved: true }, { author: req.user._id }] };
    } else {
      filter = { approved: true };
    }

    const projects = await Project.find(filter)
      .populate("author", "username fullName")
      .populate({ path: "comments", populate: { path: "author", select: "username fullName" } })
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate("author", "username fullName role")
      .populate({ path: "comments", populate: { path: "author", select: "username fullName" } });

    if (!project) return res.status(404).json({ message: "Project not found." });

    if (!project.approved) {
      const userId = req.user && (req.user.id || req.user._id);
      const isAdmin = req.user && req.user.role === "admin";
      const isAuthor = userId && project.author && project.author.toString() === userId.toString();
      if (!isAdmin && !isAuthor) return res.status(403).json({ message: "Project not approved." });
    }

    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });

    const userId = req.user && (req.user.id || req.user._id);
    const isAdmin = req.user && req.user.role === "admin";
    const isAuthor = userId && project.author && project.author.toString() === userId.toString();
    if (!isAuthor && !isAdmin) return res.status(403).json({ message: "Not authorized." });

    const updates = req.body;
    if (updates.technologies && !Array.isArray(updates.technologies)) {
      updates.technologies = updates.technologies.split(",").map(t => t.trim());
    }
    if (req.file) updates.image = req.file.path;

    Object.assign(project, updates);
    await project.save();

    res.json({ message: "Project updated.", project });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });

    const userId = req.user && (req.user.id || req.user._id);
    const isAdmin = req.user && req.user.role === "admin";
    const isAuthor = userId && project.author && project.author.toString() === userId.toString();
    if (!isAuthor && !isAdmin) return res.status(403).json({ message: "Not authorized." });

    // remove associated comments
    await Comment.deleteMany({ post: project._id, onModel: "Project" });

    await Project.findByIdAndDelete(req.params.id);

    res.json({ message: "Project deleted." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const likeProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });

    const userId = req.user && (req.user.id || req.user._id);
    if (!userId) return res.status(401).json({ message: "Authentication required." });

    if (!Array.isArray(project.likes)) project.likes = [];
    project.likes = project.likes.filter((id) => mongoose.Types.ObjectId.isValid(id));

    const alreadyLiked = project.likes.some((id) => id.toString() === userId.toString());
    if (alreadyLiked) {
      project.likes = project.likes.filter((id) => id.toString() !== userId.toString());
    } else {
      project.likes.push(userId);
    }

    await project.save();

    res.json({ likes: project.likes.length, liked: !alreadyLiked });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addCommentToProject = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return res.status(400).json({ message: "Comment content is required." });

    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: "Project not found." });

    const comment = await Comment.create({
      content,
      author: req.user && (req.user.id || req.user._id),
      post: project._id,
      onModel: "Project",
    });

    project.comments.push(comment._id);
    await project.save();

    const populated = await comment.populate("author", "username fullName");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserProjects = async (req, res) => {
  try {
    const projects = await Project.find({ author: req.user._id })
      .populate("author", "username fullName")
      .populate({ path: "comments", populate: { path: "author", select: "username fullName" } })
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
  likeProject,
  addCommentToProject,
  getUserProjects
};
