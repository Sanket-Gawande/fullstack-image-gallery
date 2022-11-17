import express from "express";
import dotenv from "dotenv";
import path from "path";
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
    origin: [process.env.CLIENT_URL],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
app.use("/api/static/images", express.static("images"));
// routes
app.use("/api", loginRouter);
app.use("/api/images", imageRouter);
app.get("/get", (req, res) => {
  // res.writeHead(304, { Location: "https://rsquare-gallery.vercel.app" }).end();
  res.redirect(`${process.env.CLIENT_URL}/verification-status`);
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
