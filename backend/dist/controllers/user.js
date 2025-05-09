"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const connection_1 = require("../db/connection");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ msg: "Please provide a username and password" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const pool = yield (0, connection_1.getConnection)();
        const { recordset } = yield pool.request().input("userName", userName).query("SELECT * FROM Users WHERE userName = @userName");
        if (recordset.length > 0) {
            return res.status(400).json({ msg: "User already exists" });
        }
        const result = yield pool.request()
            .input("userName", userName)
            .input("password", hashedPassword)
            .query("INSERT INTO Users (userName, password) VALUES (@userName, @password)");
        if (result.rowsAffected[0] === 0) {
            return res.status(500).json({ msg: "Error creating user" });
        }
        res.json(`Usuario ${userName} creado exitosamente`);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ msg: "Please provide a username and password" });
        }
        const pool = yield (0, connection_1.getConnection)();
        const { recordset } = yield pool.request().input("userName", userName).query("SELECT * FROM Users WHERE userName = @userName");
        if (recordset.length === 0) {
            return res.status(400).json({ msg: "User does not exist" });
        }
        const user = recordset[0];
        const isMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ token, user: { id: user.id, userName: user.userName } });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});
exports.loginUser = loginUser;
