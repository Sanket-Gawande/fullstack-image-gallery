import express from "express";
const imageRouter = express.Router();
import userModel from "../models/user.modal.js";
import dotenv from "dotenv";
dotenv.config();

imageRouter.post("/add", async (req, res) => {
  //  'images' name attribute provided in input(file) tag;
  const _id = "6368ded1565ea591fdcb2ea6";
  const { images } = req.files;
  // images gives object if only one image is sended
  const allFiles = images.name ? [images] : [...images];
  const imagesData = allFiles.map((image) => {
    const { name, size, mimetype } = image;
    const ext = mimetype?.substring(6);
    const random = Math.random().toString(32).substring(2);
    const path = `/images/${name}_${random}.${ext}`;
    image.mv("." + path, (err) => console.log(err));
    return {
      name,
      size,
      ext,
      path,
    };
  });
  const akg = await userModel.updateOne(
    { _id },
    {
      $push: {
        files: {
          $each: imagesData,
        },
      },
    }
  );
  console.log({ akg });
  res.send({ error: false, length: allFiles.length, imagesData });
});

export default imageRouter;
