import multer from "multer";
const s3Storage = require("multer-sharp-s3");
import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const {
  REGION: region,
  AWS_ACCESS_KEY: accessKey,
  AWS_SECRET_KEY: secretKey,
  BUCKET_NAME: Bucket,
} = process.env;

const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region,
});

const storage = s3Storage({
  s3,
  Bucket,
  Key: (req, file, cb) => {
    cb(null, `uploads/${Date.now()}_${file.originalname}`);
  },
  resize: {
    width: 400,
    height: 400,
  },
  ACL: "private",
  multiple: true,
});

const uploadMiddleware = multer({
  storage,
});

export { uploadMiddleware };
