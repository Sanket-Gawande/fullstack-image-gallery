import express from "express";
const loginRouter = express.Router();

loginRouter.post("/login", (req, res) => {
  
res.send("cdgg")
});


export default loginRouter