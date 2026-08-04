const express = require("express");
const routes = express.Router()
const protect = require("../middleware/protect");
const upload = require("../middleware/upload")

const {   
    register,
    login,
    logout,
    updateAvatar,
    profile,
    updateProfile
} = require("../controllers/user.controller")

const { getUserProjects } = require("../controllers/project.controller")

routes.post('/register', register)
routes.post('/login', login)
routes.post('/logout', logout)
routes.post("/avatar", protect, upload.single("avatar"), updateAvatar);
routes.put("/avatar", protect, upload.single("avatar"), updateAvatar);
routes.get('/projects', protect, getUserProjects)
routes.get('/profile', protect, profile)
routes.put('/profile', protect, updateProfile)

module.exports = routes