import dotenv from "dotenv";
dotenv.config();

export default function template(name, token) {
  return `
  <!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width,initial-scale=1"><title>rsquare</title></head><body style="background-color:#fff;width:100%"><section style="max-width:600px;margin:1rem auto;border-radius:.5rem;border:1px solid #ddd;padding:1rem;background:#fff;box-shadow:0 0 20px rgba(0,0,0,.05);width:95%"><h3 style="">${name}<h2 style="padding:.15rem .5rem">Thank you for tesing gallery application, verift your account to get started!</h2><p style="color:#555;padding:.5rem">Please verify email to activate account using link given below</p><a href="${process.env.BASE_URL}/api/email/verify/${token}" style="padding:.5rem 1rem;background:#6360ab;color:#fff;border-radius:.25rem;text-transform:uppercase;text-decoration:none;font-size:.9rem;font-weight:500">click here</a></section></body></html>
`;
}
