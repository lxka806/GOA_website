const mongoose = require("mongoose")

const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    github: { type: String },
    liveDemo: { type: String },
    technologies: [{ type: String }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    approved: { type: Boolean, default: false },
}, { timestamps: true })

module.exports = mongoose.model("Project", ProjectSchema)
