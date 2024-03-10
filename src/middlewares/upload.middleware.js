const multer = require("multer");
const path = require("path");

module.exports = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, "../public/img"));
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
