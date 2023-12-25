import dotenv from "dotenv";
dotenv.config();

export default function template(name, token) {
  return `
 <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Full stack image gallery</title></head><body style="background-color:#fff;width:100%;font-family:Verdana,Sans"><section style="max-width:500px;margin:2rem auto;border-radius:.5rem;padding:1rem;background:#eee;box-shadow:0 0 20px rgba(0,0,0,.05);width:95%"><p>Hey, ${name}.</p><p>Thank you for tesing my gallery application,Please verift your email to get started!</p><p>Please verify email to activate account using link given below</p><br><a href="${process.env.BASE_URL}/api/email/verify/${token}" style="padding:.5rem 1rem;background:#6360ab;color:#fff;border-radius:.5rem;text-decoration:none;font-size:1rem;font-weight:500;display:bolck">click here</a><br><p>Or</p><p>copy and paste following link into your browser</p><p>${process.env.BASE_URL}/api/email/verify/${token}</p></section><p style="text-align:center;color:#555;font-size:.85rem">Created by Sanket Gawande</p></body></html>
`;
}
