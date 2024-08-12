import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from 'jsonwebtoken';
export const getPosts = (req, res) => {

    const userId=req.query.userId;    

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, process.env.secretKey, (err, userInfo) => {
        if (err) res.status(403).json("Token is not valid");

        const q = userId!=='undefined'?`Select p.*, u.id AS userId, name, profilePic from posts as p JOIN users as u ON(p.userId=u.id) WHERE u.id=?`:`Select p.*, u.id AS userId, name, profilePic from posts as p JOIN users as u ON(u.id=p.userId) LEFT JOIN relationships AS r ON (p.userId=r.followedUserId) WHERE r.followerUserId=? OR p.userId=? ORDER BY p.createdAt DESC`;

        const values=userId!=='undefined'?[userId]:[userInfo.id, userInfo.id]
        db.query(q, values, (err, data) => {
            if (err) return res.status(500).json(err);
            console.log(data);
            return res.status(200).json(data);
        })
    })
}

export const addPost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, process.env.secretKey, (err, userInfo) => {
        if (err) res.status(403).json("Token is not valid");

        const q = "INSERT INTO posts(`desc`,`img`,`createdAt`,`userId`) VALUES (?)";
        console.log(req.body.desc);
        console.log(req.body.img);
        
        
        const values=[
            req.body.desc,
            req.body.img,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("POst created");
        })
    })
}

export const deletePost = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, process.env.secretKey, (err, userInfo) => {
        if (err) res.status(403).json("Token is not valid");
        console.log(req.params.id);

        const q = "DELETE FROM posts WHERE `id`=? AND `userId`=?";

        db.query(q, [req.params.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            if(data.affectedRows>0) return res.status(200).json("Post has been deleted");
            return res.status(403).json("Action not allowed");
        })
    })
}