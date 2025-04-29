// middleware/multer.js
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./uploads");
  },
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(null, `image-${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const isImage = (req, file, callback) => {
  const allowedFileTypes = /jpeg|jpg|png|gif/;
  const mimeTypeIsValid = file.mimetype.startsWith("image/");
  const extnameIsValid = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());

  if (mimeTypeIsValid && extnameIsValid) {
    callback(null, true);
  } else {
    callback(new Error("Only JPEG, JPG, PNG, and GIF files are allowed."));
  }
};

const uploadSingle = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: isImage,
}).single("profilePic");

module.exports = { uploadSingle };
