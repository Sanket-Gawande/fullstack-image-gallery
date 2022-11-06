import jwt from "jsonwebtoken"
export default async function verifyUser(req ,res , next) {
  const {token} = req.cookies
  try {
    const user =  jwt.verify(token , process.env.SECRET)
    req.user = user;
    next();

  } catch (error) {
    res.send({error : true , message : "Invalid credentials"})
    console.log(error)
  }

}