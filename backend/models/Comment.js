const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "onModel",
    },
    onModel: {
        type: String,
        required: true,
        enum: ["Post", "Project"],
        default: "Post"
    }
}, { timestamps: true })

module.exports = mongoose.model("Comment", commentSchema)