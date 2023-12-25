import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import fileUpload from "express-fileupload";
import mongoose from "mongoose";
import loginRouter from "./routes/login.js";
import cookieParser from "cookie-parser";
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
  res.redirect(`${process.env.CLIENT_URL}/verification-status`);
});
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    app.listen(PORT, (err) => {
      console.info(`app is live at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });