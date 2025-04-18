import express from "express";
import { connectDb } from "./config/db.js";
import cors from "cors";
import router from "./routes/authroute.js";
import QpMainrouter from "./routes/QpMainRoute.js";
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.use("/api/user", router);
app.use("/api/qpaper", QpMainrouter);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
