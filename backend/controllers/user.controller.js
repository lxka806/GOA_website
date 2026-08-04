const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const isProduction = process.env.NODE_ENV === "production";

const register = async (req, res) => {
    try {
        const {
            fullName,
            username,
            email,
            password,
            bio,
            country,
            github,
            portfolio
        } = req.body;

        if (!fullName || !username || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        const existingUser = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingUser) {
            return res.status(400).json({
                message: "Email is already registered."
            });
        }

        if (existingUsername) {
            return res.status(400).json({
                message: "Username is already taken."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            username,
            email,
            password: hashedPassword,
            bio,
            country,
            github,
            portfolio
        });

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                bio: user.bio,
                country: user.country,
                github: user.github,
                portfolio: user.portfolio,
                xp: user.xp,
                level: user.level,
                achievements: user.achievements,
            },
        });

    } catch (e) {
        res.status(500).json({
            message: e.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return res.status(400).json({
                message: "Please enter your email and password.",
            });
        }

        // Find user
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }

        // Create JWT
        const token = jwt.sign(
            {
                id: user._id,
                role: user.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "7d",
            }
        );

        // Save token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            message: "Login successful.",
            user: {
                id: user._id,
                fullName: user.fullName,
                username: user.username,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
                bio: user.bio,
                country: user.country,
                github: user.github,
                portfolio: user.portfolio,
                xp: user.xp,
                level: user.level,
                achievements: user.achievements,
            },
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const logout = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            path: "/",
        });

        res.status(200).json({
            message: "Logout successful.",
        });

    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

const updateAvatar = async(req,res)=>{

    try{

        if(!req.file){
            return res.status(400).json({
                message:"Please upload an image"
            });
        }


        const user = await User.findByIdAndUpdate(
            req.user._id,
            {
                avatar:req.file.path
            },
            {
                new:true
            }
        ).select("-password");


        res.json({
            message:"Avatar updated",
            avatar:user.avatar
        });


    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

const profile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password")

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        res.status(200).json({
            user
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {

        const {
            fullName,
            username,
            email,
            bio,
            country,
            github,
            portfolio
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                message: "User not found."
            });
        }

        if (username && username !== user.username) {
            const existingUsername = await User.findOne({ username });
            if (existingUsername && existingUsername._id.toString() !== req.user._id.toString()) {
                return res.status(400).json({ message: "Username is already taken." });
            }
        }

        if (email && email !== user.email) {
            const existingEmail = await User.findOne({ email });
            if (existingEmail && existingEmail._id.toString() !== req.user._id.toString()) {
                return res.status(400).json({ message: "Email is already registered." });
            }
        }

        // Update only allowed fields
        user.fullName = fullName || user.fullName;
        user.username = username || user.username;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.country = country || user.country;
        user.github = github || user.github;
        user.portfolio = portfolio || user.portfolio;

        // DON'T update role

        await user.save();

        const updatedUser = await User.findById(req.user._id).select("-password");

        res.json({
            message: "Profile updated.",
            user: updatedUser
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

module.exports = {
    register,
    login,
    logout,
    updateAvatar,
    profile,
    updateProfile
};
