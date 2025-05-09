import { Request, Response } from "express"
import { getConnection } from "../db/connection"

export const getProducts = async (req: Request, res: Response) => {
    const pool = await getConnection();
    const result = await pool.request().query("SELECT * FROM Products");
    res.json(result.recordset);
}