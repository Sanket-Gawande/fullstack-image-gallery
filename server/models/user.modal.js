import mongoose from "mongoose";
const reqString = { type: String, required: true };
const userSchema = mongoose.Schema({
  fname: reqString,
  lname: String,
  phone: reqString,
  password: reqString,
  email: reqString,
  verified: Boolean,
  verificationToken: String,
  joinedOn: { type: Date, default: Date.now() },
  tokenCreatedOn: { type: Date, default: Date.now() },
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
