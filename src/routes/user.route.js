import express from 'express';
const router = express.Router();

import {registerUser, loginUser, getUserProfile, updateUserProfile, updateUserProfileImage} from '../controllers/user.controller.js';
import {verifyJwt} from '../middlewares/auth.middleware.js'
import {upload} from '../middlewares/multer.middleware.js';

router.post('/register', upload.single('profileImage'), registerUser);
router.post('/login', loginUser);
router.get('/profile/:userId',verifyJwt, getUserProfile);
router.put('/profile', verifyJwt, updateUserProfile);
router.put('/profileImage/update', verifyJwt, upload.single('profileImage'), updateUserProfileImage);



export default router;