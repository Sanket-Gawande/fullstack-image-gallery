import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import mongoose from "mongoose";
import loginRouter from "./routes/login.js";
import cookieParser from "cookie-parser";
import sendMail from "./email/sendMail.js";
const app = express();

const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);
app.use(cookieParser());
app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: false, limit: "20mb" }));
// routes
app.use("/api", loginRouter);
app.get("/", async (req, res) => {
  const mail = await sendMail(
    "sanketgawande.gcoey@gmail.com",
    "Sanket",
    "dsjdfij6i857686v"
  );
  res.send({
    mail,
    iamge:
      "https://baahi.s3.ap-south-1.amazonaws.com/images/images500/50293539_4.jpg",
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
