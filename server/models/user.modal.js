import mongoose, { mongo } from "mongoose";
const reqString = { type: String, required: true };
const imageSchema = mongoose.Schema({
  name: String,
  id: String,
  path: String,
  ext: String,
  size : Number
});
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
  files: [imageSchema],
});

const userModel = mongoose.model("user", userSchema);
export default userModel;
