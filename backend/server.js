const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
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

const CLIENT_URL = process.env.CLIENT_URL;

app.use(cors({
    origin: true,
    credentials: true,
}));

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