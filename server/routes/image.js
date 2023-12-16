import express from "express";
import fs from "fs";
const imageRouter = express.Router();
import userModel from "../models/user.modal.js";
import dotenv from "dotenv";
import verifyToken from "../middleware.js";
dotenv.config();

imageRouter.post("/add", verifyToken, async (req, res) => {
  // middleware  function checks for the token , if it exists verifies the jwt token and binds user object on request object
  const { _id } = req.user;
  //  'images' name attribute provided in input(file) tag;
  const { images } = req?.files || {};
  // images gives object if only one image is sended
  const allFiles = images?.name ? [images] : [...images];
  if (allFiles.length <= 0) {
    res.status(400).json({ error: true, message: "No images found" });
    return;
  }

  const imagesData = allFiles.map((image) => {
    const { name, size, mimetype } = image;
    // handling svg files extention as it giver mimetype = image/svg+xml
    const ext = mimetype === "image/svg+xml" ? "svg" : mimetype?.substring(6);
    const random = Math.random().toString(32).substring(2);
    const path = `images/${name}_${random}.${ext}`;
    try {
      image.mv("./" + path, (err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
    return {
      name,
      id: random,
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
  res
    .status(200)
    .send({ error: false, length: allFiles.length, imagesData, akg });
});

// deleting image router
imageRouter.post("/delete", verifyToken, async (req, res) => {
  // middleware  function checks for the token , if it exists verifies the jwt token and binds user object on request object
  const { _id } = req.user;
  const { ids = [], paths = [] } = req.body;
  // deleting image files from the server
  for (let path of paths) {
    fs.unlink(`./${path.path}`, (err) => {
      console.log({ err }, err && "file deleting error");
    });
  }

  if (!ids.length) {
    res.send({
      error: true,
      message: "Ids must be provided of elements to be deleted.",
    });
    return;
  }
  const akg = await userModel.updateOne(
    { _id },
    {
      $pull: {
        files: {
          id: { $in: ids },
        },
      },
    }
  );
  res.status(200).json({
    akg,
    error: false,
    message: "Images deleted successfully.",
  });
});
export default imageRouter;
