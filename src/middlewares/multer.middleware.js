import multer from 'multer';
import path from 'path';

const PROFILE_IMAGE_PATH = path.join('public','temp');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, PROFILE_IMAGE_PATH);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
  
  export const upload = multer({ storage: storage });
