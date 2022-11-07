import mongoose from "mongoose";
import userModel from "../models/user.modal.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendMail from "../email/sendMail.js";
dotenv.config();
const loginRouter = express.Router();

// sign up route
loginRouter.post("/signup", async (req, res) => {
  const { fname, lname, email, phone, password } = req.body;
  if (!fname || !lname || !email || !phone || !password) {
    res.json({ error: true, message: "Please enter all required fileds" });
    return;
  }
  const exist = await userModel.find({ email });
  const verificationToken = bcrypt.hashSync(
    Math.random().toString(32).substring(2, 10),
    10
  );
  console.log({ exist });
  //  check if email already exist and accound is activated
  if (exist.length > 0 && exist[0]?.verified) {
    res.json({ error: true, message: "email already exist" });
    return;
  }
  // check if email exist but email is not verified
  if (exist.length > 0 && !exist[0]?.verified) {
    try {
      // on re-signup older data will be updated with new time (30 minute constraint)
      const updateTokenTime = await userModel.updateOne(
        { email },
        {
          $set: { tokenCreatedOn: new Date() },
        }
      );
      await sendMail(email, fname + lname, verificationToken);
      res.json({
        error: true,
        updateTokenTime,
        message:
          "You are already registered with us, plese check your email for confirmation.",
      });
      return;
    } catch (error) {
      console.log({ error });
      res.json({ error: true, message: "Something went wrong !!!" });
    }
  }

  const hashed = bcrypt.hashSync(password, 10);

  const mailStatus = await sendMail(email, fname + lname, verificationToken);
  if (mailStatus?.accepted?.includes(email)) {
    const created = await userModel.create({
      fname,
      lname,
      email,
      password: hashed,
      verificationToken,
      phone,
      verified: false,
    });

    const token = jwt.sign(
      { email, name: fname + lname, _id: created._id },
      process.env.JWT_SECRET
    );
    created.password = undefined;

    res.cookie("user", token).send({
      error: false,
      token,
      user: created,
      message:
        "Your account is created successfully, please verify email to activate your account",
    });
    return;
  }
  res.send({ error: true, message: "Please provide valid email address." });
});

// login route
loginRouter.post("/login", (req, res) => {});

//  email verification token
loginRouter.get("/email/verify/:verificationToken", async (req, res) => {
  const { verificationToken } = req.params;
  const verified = await userModel.find({ verificationToken });
  console.log({ verificationToken, verified });
  if (!verified[0]) {
    res.json({ error: true, message: "Invalid link" });
    return;
  }
  const validTime =
    new Date().getTime() - new Date(verified[0].tokenCreatedOn).getTime();
  console.log(verified, { validTime }, verified[0].tokenCreatedOn);
  if (validTime <= 1.8e6) {
    const newToken = bcrypt.hashSync(
      Math.random().toString(32).substring(2, 10),
      10
    );
    const r = await userModel.updateOne(
      { verificationToken },
      { $set: { verified: true, verificationToken: newToken } }
    );
    res.json({ verified, r });
    return;
  }
  res.json({ error: true, message: "Verification link is expired" });
});
export default loginRouter;
