import dotenv from "dotenv";
dotenv.config();
export default function template(name, token) {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>rsquare</title>
  </head>
  <body style="background-color: #ddd;">
    <section style="max-width: 800px; margin: 1rem auto;">

      <h2 style="padding:.15rem 0.5rem;">${name}</h2>
      <h2 style="padding:.15rem 0.5rem;">Thank you for choosing us</h2>
      <p style="color: #555; padding: 0.5rem;">
        Please verify email to activate account using link given below
      </p>
      <a
        href='${process.env.BASE_URL}/api/email/verify/${token}'
        style="padding: 0.5rem 1rem; background: #6360ab; color: white;"
      >
        click here
      </a>
    </section>
  </body>
</html>
`;
}
