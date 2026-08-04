const express = require("express")
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT
const mongoose = require("mongoose")
const MONGODB_URL = process.env.MONGODB_URL
const cookieParser = require("cookie-parser");
const adminRoutes = require("./routes/admin.routes");
const userRouter = require('./routes/user.routes')
const postRouter = require('./routes/post.routes')
const projectRouter = require('./routes/project.routes')


const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL || "http://localhost:5173");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    if (req.method === "OPTIONS") {
        return res.sendStatus(200);
    }     
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRouter)
app.use("/api/profile", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/projects", projectRouter);



mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("MONGODB is conected")

        app.listen(PORT, () => {
            console.log('server is running on port:', PORT)
        })
    })