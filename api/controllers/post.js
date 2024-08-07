import { db } from "../connect.js";
import jwt from 'jsonwebtoken';
export const getPosts=(req,res)=>{
    
    const token=req.cookies.accessToken;
    if(!token) return res.status(401).json("Not logged in");

    jwt.verify(token, process.env.secretKey, (err,userInfo)=>{
        if(err) res.status(403).json("Token is not valid");
        
        const q=`Select p.*, u.id AS userId, name, profilePic from posts as p JOIN users as u ON(u.id=p.userId) LEFT JOIN relationships AS r ON (p.userId=r.followedUserId) WHERE r.followerUserId=? OR p.userId=?`;
        
        db.query(q,[userInfo.id, userInfo.id], (err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json(data);
        })
    })
}