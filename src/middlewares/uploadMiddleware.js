const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();

  if (ext === ".csv") {
    cb(null, true);
  } else {
    cb(new Error("Hanya file CSV yang diperbolehkan"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;