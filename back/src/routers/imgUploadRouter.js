import { Router } from "express";
import { uploadMiddleware } from "../middlewares/uploadMiddleware";
import loginRequired from "../middlewares/loginRequired";
import dotenv from "dotenv";
dotenv.config();

const imgUploadRouter = Router();

imgUploadRouter.use(loginRequired);

// 사진 한 장
imgUploadRouter.post(
  "/single",
  uploadMiddleware.single("img"),
  (req, res, next) => {
    try {
      const imgUrl = req.file.Location;

      const result = { message: "success", data: imgUrl };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
);

// 사진 여러 장
imgUploadRouter.post(
  "/multi",
  uploadMiddleware.array("img"),
  async (req, res, next) => {
    try {
      const files = req.files;

      const imgUrl = files.map((file) => file.Location);

      const result = { message: "success", data: imgUrl };

      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

export { imgUploadRouter };
