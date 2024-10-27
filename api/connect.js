import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

export const db=mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:process.env.DB_PASS,
    database:"social"
});