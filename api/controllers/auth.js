import jwt from "jsonwebtoken";
import { db } from "../connect.js";
import bcrypt from "bcryptjs";

export const register = (req, res) => {
    //Check user exists

    const q = "Select * from users where username= ?";

    db.query(q, [req.body.username], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length > 0) return res.status(409).json("User already exists");

        //create new user
        const salt = bcrypt.genSaltSync(10);
        const hashedPass = bcrypt.hashSync(req.body.password, salt);

        //Insert new user to db
        const q = "Insert into users (`username`, `email`, `password`, `name`) value (?)";
        const values = [req.body.username, req.body.email, hashedPass, req.body.name];

        db.query(q, [values], (err, data) => {
            if (err) return res.status(500).json(err);
            return res.status(200).json("User has been created");
        })
    })

}

export const login = (req, res) => {
    //Check user exists
    const q = "Select * from users where email= ?";

    db.query(q, [req.body.email], (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length <1) return res.status(404).json("User not found");

        //verify user
        const checkPass = bcrypt.compareSync(req.body.password, data[0].password);
        if(!checkPass) return res.status(400).json("Wrong pass or username");

        //generate jwt
        const payload={
            id:data[0].id
        }
        const token=jwt.sign(payload, process.env.secretKey);

        //set cookie
        const {password, ...others}=data[0];
        res.cookie("accessToken", token,{httpOnly:true}).status(200).json(others);
    })

}

export const logout=(req,res)=>{
    res.clearCookie("accessToken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("User has been logged out");
}