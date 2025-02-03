import express from "express";
import { signup, login, resetPassword } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.put("/forgot", resetPassword);

export default router;
