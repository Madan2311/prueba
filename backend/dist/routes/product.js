"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_js_1 = require("../controllers/product.js");
const validate_token_js_1 = __importDefault(require("./validate-token.js"));
const router = (0, express_1.Router)();
router.get('/', validate_token_js_1.default, product_js_1.getProducts);
exports.default = router;
