import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import loginRouter from "./routes/login.js";
import cookieParser from "cookie-parser";
const app = express();

const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: ["http://localhost:8000"],
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
// routes
app.use("/api", loginRouter);
app.get("/", (req, res) => {
  
  res.send("hello world");
});
mongoose
  .connect(process.env.mongo_url, {})
  .then(() => {
    console.log("connecting to mongoDB");
    console.log("connecting to server");

    app.listen(PORT, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("server is listening : ", PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
