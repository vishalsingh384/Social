import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const getRel=(req,res)=>{
    const q="SELECT followerUserId FROM relationships WHERE followedUserId=(?)";

    db.query(q,[req.query.followedUserId], (err,data)=>{
        if(err) return res.status(500).json(err);
        return res.status(200).json(data.map(relationship=>relationship.followerUserId));
    });
}

export const addRel=(req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, process.env.secretKey, (err, userInfo) => {
        if (err) res.status(403).json("Token is not valid");

        const q = "INSERT INTO relationships (`followedUserId`, `followerUserId`) VALUES (?)";
        const values=[
            req.body.userId,
            userInfo.id
        ];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.json("Following");
        })
    })
}

export const deleteRel=(req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, process.env.secretKey, (err, userInfo) => {
        if (err) res.status(403).json("Token is not valid");

        const q = "DELETE FROM relationships WHERE `followedUserId`=? AND `followerUserId`=?";

        db.query(q, [req.query.userId, userInfo.id], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("Deleted");
        })
    })
}