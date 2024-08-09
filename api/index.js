import express from 'express';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import commentRoutes from './routes/comments.js';
import likeRoutes from './routes/likes.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import multer from 'multer';

const app=express();
dotenv.config();

//middleware
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true);
    next();
})
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}));
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = (Date.now() + file.originalname);
      cb(null, uniqueSuffix);
    }
  })

const upload=multer({storage:storage});

app.post("/api/upload", upload.single("file"), (req,res)=>{
    const file=req.file;
    console.log(file);
    return res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/likes", likeRoutes);
app.use("/*",(req,res)=>{
    res.status(500).json("endpoint not found");
})

app.listen(8800,()=>{
    console.log("server is listening");
})