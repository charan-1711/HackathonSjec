import express from "express";
import { signin, signup } from "../controllers/authcontoller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/signin").post(signin);
router.route("/signup").post(authMiddleware, signup);

export default router;
