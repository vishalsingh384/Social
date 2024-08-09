import moment from "moment/moment.js";
import { db } from "../connect.js";
import jwt from 'jsonwebtoken';
export const getPosts = (req, res) => {
    console.log("called");

    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, process.env.secretKey, (err, userInfo) => {
        if (err) res.status(403).json("Token is not valid");

        const q = `Select p.*, u.id AS userId, name, profilePic from posts as p JOIN users as u ON(u.id=p.userId) LEFT JOIN relationships AS r ON (p.userId=r.followedUserId) WHERE r.followerUserId=? OR p.userId=? ORDER BY p.createdAt DESC`;

        db.query(q, [userInfo.id, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
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