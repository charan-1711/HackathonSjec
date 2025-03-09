import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { addSubject, deleteSubject } from "../controllers/subjectDetails.js";

const QpMainrouter = express.Router();

QpMainrouter.route("/subject")
  .post(authMiddleware, addSubject)
  .delete(authMiddleware, deleteSubject);

export default QpMainrouter;
