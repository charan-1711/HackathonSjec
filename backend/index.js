import express from "express";
import { connectDb } from "./config/db.js";
import cors from "cors";
const PORT = 3000;
const app = express();

app.use(cors());
app.use(express.json());

connectDb();

app.get("/", (req, res) => {
  res.json({
    msg: "hello",
  });
});

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
});
