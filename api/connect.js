import mysql from "mysql";
import dotenv from 'dotenv';
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 10, // Adjust based on your needs
    host: "127.0.0.1",
    user: "root",
    password: process.env.DB_PASS,
    database: "social"
});

// Override the query method to maintain the same callback interface
export const db = {
    query: (sql, values, callback) => {
        pool.query(sql, values, (error, results) => {
            if (error) {
                return callback(error);
            }
            callback(null, results);
        });
    }
};
