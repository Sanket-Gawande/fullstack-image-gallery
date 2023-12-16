import nodemailer from "nodemailer";
import template from "./mailTemplste.js";
import dotenv from "dotenv";
dotenv.config();
export default async function sendMail(email, name, token) {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_ID,
      pass: process.env.PASSWORD,
    },
  }); 
  try {
    const confirmation = await transport.sendMail({
      from:process.env.USER_ID,
      to: email,
      subject: "Email verification",
      html: template(name, token),
    });
    return confirmation;
  } catch (error) {
    console.log({ error });
    return error;
  }
}
