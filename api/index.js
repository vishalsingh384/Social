import express from 'express';
import authRoutes from './routes/auth.js';
import postRoutes from './routes/posts.js';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

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

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/*",(req,res)=>{
    res.status(500).json("endpoint not found");
})

app.listen(8800,()=>{
    console.log("server is listening");
})