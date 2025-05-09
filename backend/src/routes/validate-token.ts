import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    const headerToken = req.headers['authorization'];
    if (!headerToken && !headerToken?.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    try {
        const token = headerToken?.split(' ')[1];
        jwt.verify(token as string, process.env.JWT_SECRET as string);
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ msg: 'Invalid token' });

    }

}
export default validateToken;