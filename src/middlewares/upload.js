const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

aws.config.update({
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  accessKeyId: process.env.ACCESS_KEY_ID,
  region: process.env.REGION,
});
var s3 = new aws.S3();
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.BUCKET,
    contentType: function (req, file, cb) {
      cb(null, file.mimetype);
    },
    acl: "public-read",
    key: function (req, file, cb) {
      const newFilename = `${uuidv4()}${path.extname(file.originalname)}`;
      cb(null, newFilename);
    },
  }),
});

module.exports = upload;
