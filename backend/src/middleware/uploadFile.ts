const multer = require('multer');
const fs = require('fs');
const folderName = './uploads/';
const fileName = './uploads/crops';
const AppError = require('./../utils/appError');

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    fs.mkdirSync(fileName);
  }
  if(!fs.existsSync(fileName)) {
    fs.mkdirSync(fileName);
  }
} catch (err) {
  console.error(err);
}

const multerFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};

const storage = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, './uploads/crops');
  },
  filename: function (req: any, file: any, cb: any) {
    console.log(req.user);
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    // cb(null, `${req.user.id}.jpeg`);
  },
});

export const upload = multer({ storage: storage, fileFilter: multerFilter });
