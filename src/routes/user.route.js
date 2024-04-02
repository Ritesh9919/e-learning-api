import express from 'express';
const router = express.Router();

import {registerUser, loginUser} from '../controllers/user.controller.js';
import {upload} from '../middlewares/multer.middleware.js';

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);



export default router;