const multer = require("multer");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
import dotenv from "dotenv";
dotenv.config();

const {
  REGION: region,
  AWS_ACCESS_KEY: accessKey,
  AWS_SECRET_KEY: secretKey,
  BUCKET_NAME: bucket,
} = process.env;

const s3 = new AWS.S3({
  accessKeyId: accessKey,
  secretAccessKey: secretKey,
  region,
});

const uploadMiddleware = multer({
  storage: multerS3({
    s3,
    bucket,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: (req, file, cb) => {
      cb(null, `uploads/${Date.now()}_${file.originalname}`);
    },
    limits: { fileSize: 5 * 1024 * 1024 },
  }),
});

export { uploadMiddleware };
