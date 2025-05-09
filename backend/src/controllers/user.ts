import { Request, Response } from "express"
import { getConnection } from "../db/connection"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const newUser = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ msg: "Please provide a username and password" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const pool = await getConnection();
        const { recordset } = await pool.request().input("userName", userName).query("SELECT * FROM Users WHERE userName = @userName");
        if (recordset.length > 0) {
            return res.status(400).json({ msg: "User already exists" });
        }

        const result = await pool.request()
            .input("userName", userName)
            .input("password", hashedPassword)
            .query("INSERT INTO Users (userName, password) VALUES (@userName, @password)");

        if (result.rowsAffected[0] === 0) {
            return res.status(500).json({ msg: "Error creating user" });
        }
        res.json(`Usuario ${userName} creado exitosamente`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ msg: "Please provide a username and password" });
        }
        const pool = await getConnection();
        const { recordset } = await pool.request().input("userName", userName).query("SELECT * FROM Users WHERE userName = @userName");
        if (recordset.length === 0) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const user = recordset[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, { expiresIn: "1h" });
        res.json({ token, user: { id: user.id, userName: user.userName } });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
        
    }
}