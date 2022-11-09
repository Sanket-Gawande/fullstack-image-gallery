import mongoose from "mongoose";
import userModel from "../models/user.modal.js";
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import sendMail from "../email/sendMail.js";
import verifyToken from "../middleware.js";
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
  const verificationToken = bcrypt
    .hashSync(Math.random().toString(32).substring(2, 10), 10)
    .replace(/[/$.]/g, "");
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
      res
        .status(400)
        .json({ error: true, message: "Something went wrong !!!" });
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

    created.password = undefined;

    res.status(200).send({
      error: false,
      user: created,
      message:
        "Your account is created successfully, please verify email to activate your account",
    });
    return;
  }
  res.send({ error: true, message: "Please provide valid email address." });
});

// login route
loginRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });
  if (!user) {
    res
      .status(400)
      .send({ error: true, message: "Email is not registed with us." });
    return;
  }
  if (!user.verified) {
    res.status(400).json({
      error: true,
      message:
        "Email is not verified.Please verify using link sent to your email within 30min or re-signup",
    });
    return;
  }
  if (!bcrypt.compareSync(password, user.password)) {
    res.status(400).json({ error: true, message: "Invalid creadentials" });
    return;
  }
  user.password = undefined;
  user.verificationToken = undefined;
  const token = jwt.sign({ email, _id: user._id }, process.env.JWT_SECRET);
  res
    .status(200)
    .cookie("token", token, {
      secure: true,
      httpOnly: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .json({ error: false, message: "Login successfull", user });
});

//  email verification token
loginRouter.get("/email/verify/:verificationToken", async (req, res) => {
  const { verificationToken } = req.params;
  const verified = await userModel.find({ verificationToken });
  if (!verified[0]) {
    res.json({ error: true, message: "Invalid link" });
    return;
  }
  const validTime =
    new Date().getTime() - new Date(verified[0].tokenCreatedOn).getTime();
  if (validTime <= 1.8e6) {
    const newToken = bcrypt.hashSync(
      Math.random().toString(32).substring(2, 10),
      10
    );
    const r = await userModel.updateOne(
      { verificationToken },
      { $set: { verified: true, verificationToken: newToken } }
    );
    res.redirect(process.env.CLIENT_URL);
    return;
  }

  res.json({ error: true, message: "Verification link is expired" });
});

loginRouter.post("/getuser", verifyToken, async (req, res) => {
  const { _id } = req.user;
  try {
    const user = await userModel.findOne({ _id });
    user.password = undefined;
    user.verificationToken = undefined;
    res.status(200).json({ user, error: false });
  } catch (error) {
    res.status(400).json({ message: error.message, error: true });
  }
});
export default loginRouter;
