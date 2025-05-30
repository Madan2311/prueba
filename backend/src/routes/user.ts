import { Router } from "express";
import { newUser, loginUser } from "../controllers/user.js";

const router = Router();

router.post("/", newUser);
router.post("/login", loginUser);

export default router