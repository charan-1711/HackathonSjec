import express from "express";
import {
  signin,
  addUser,
  changePassword,
} from "../controllers/authcontoller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserData, getAllUsers } from "../controllers/userDataController.js";

const router = express.Router();

router.route("/signin").post(signin);
router.route("/addUser").post(authMiddleware, addUser);
router.route("/getUserDetails").get(authMiddleware, getUserData);
router
  .route("/users")
  .get(authMiddleware, getAllUsers)
  .post(authMiddleware, changePassword);

export default router;
