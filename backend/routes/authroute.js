import express from "express";
import { signin, signup } from "../controllers/authcontoller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserData } from "../controllers/userDataController.js";

const router = express.Router();

router.route("/signin").post(signin);
router.route("/signup").post(authMiddleware, signup);
router.route("/getUserDetails").get(authMiddleware, getUserData);

export default router;
