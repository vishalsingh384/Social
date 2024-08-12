import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const getUser=(req,res)=>{
    const q="SELECT * from users WHERE id=(?)";
    db.query(q,[req.params.id],(err,data)=>{
        if(err||data.length<1) return res.status(500).json(err);
        const {password, ...others}=data[0];
        return res.json(others);
    }) 
}

export const updateUser=(req,res)=>{
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, process.env.secretKey, (err, userInfo) => {
        if (err) return res.status(403).json("Token is not valid");

        const q = "UPDATE users SET `name`=?, `city`=?, `website`=?, `coverPic`=?, `profilePic`=? WHERE id=?";

        const values=[req.body.name, req.body.city, req.body.website, req.body.coverPic, req.body.profilePic, userInfo.id];

        db.query(q,values,(err,data)=>{
            if(err) res.status(500).json(err);
            if(data.affectedRows>0) return res.json("Updated");
            return res.status(403).json("You can update only your own post");
        })
    });
}