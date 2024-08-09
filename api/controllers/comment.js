import jwt from 'jsonwebtoken';
import { db } from '../connect.js';
import moment from 'moment';

export const getComment = (req, res) => {
    const q = `SELECT c.*, u.id as userId, name, profilePic from comments as c JOIN users as u ON(u.id=c.userId) WHERE c.postId= ? ORDER BY c.createdAt DESC`;

    db.query(q, [req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data);
    })
}

export const postComment = (req, res) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, process.env.secretKey, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "INSERT INTO comments(`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";
        const values = [
            req.body.comment,
            moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            userInfo.id,
            req.body.postId
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Comment has been created");
        });
    });
}
