const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/Users/jamshaid.mehmood/Desktop/Arbisoft-Training/nextjs-starter/public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage:  storage });

module.exports = upload;
