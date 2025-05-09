"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (!headerToken && !(headerToken === null || headerToken === void 0 ? void 0 : headerToken.startsWith('Bearer '))) {
        return res.status(401).json({ msg: 'No token provided' });
    }
    try {
        const token = headerToken === null || headerToken === void 0 ? void 0 : headerToken.split(' ')[1];
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ msg: 'Invalid token' });
    }
};
exports.default = validateToken;
