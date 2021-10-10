const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please upload only images.", false);
  }
};

var imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
    // cb(null, `${Date.now()}-imt-${file.originalname}`);
  },
});

const excelFilter = (req, file, cb) => {
  if (
    file.mimetype.includes("excel") ||
    file.mimetype.includes("spreadsheetml")
  ) {
    cb(null, true);
  } else {
    cb("Please upload only excel file.", false);
  }
};

var excelStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/excel/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
    // cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
  },
});


var isImage = multer({ storage: imageStorage, fileFilter: imageFilter });
var isExcel = multer({ storage: excelStorage, fileFilter: excelFilter });

const uploadFile = {
  isImage: isImage,
  isExcel: isExcel,
}
module.exports = uploadFile;