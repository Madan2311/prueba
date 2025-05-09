"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_js_1 = require("../controllers/user.js");
const router = (0, express_1.Router)();
router.post("/", user_js_1.newUser);
router.post("/login", user_js_1.loginUser);
exports.default = router;
