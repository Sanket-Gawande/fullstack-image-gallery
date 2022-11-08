import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import loginRouter from "./routes/login.js";
import cookieParser from "cookie-parser";
import sendMail from "./email/sendMail.js";
import imageRouter from "./routes/image.js";
const app = express();

const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: "*",
  })
);
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
app.use("/images", express.static("images"));
// routes
app.use("/api", loginRouter);
app.use("/api/images", imageRouter);

app.get("/", async (req, res) => {
  res.send({
    hello: "world",
  });
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
