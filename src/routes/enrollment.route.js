import express from 'express';
const router = express.Router();
 
import {enrollment,getEnrolledCourse} from '../controllers/enrollment.controller.js';
import {verifyJwt} from '../middlewares/auth.middleware.js'

router.post('/:courseId', verifyJwt, enrollment);
router.get('/', verifyJwt, getEnrolledCourse);

export default router;