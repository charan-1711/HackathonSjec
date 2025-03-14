import { asyncHandler } from "./asyncHandler.js";
import jwt from "jsonwebtoken";

const JWT_SECRET = "123456";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = await req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = await authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.userId) {
      req.userId = decoded.userId;
      console.log(req.userId);
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({});
  }
});

export { authMiddleware };
