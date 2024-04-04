import express from 'express';
const router = express.Router();

import {createCourse,getCourse,updateCourse,deleteCourse, getCourses} from '../controllers/course.controller.js';
import {verifyJwt} from '../middlewares/auth.middleware.js';
import {upload} from '../middlewares/multer.middleware.js';

router.post('/', verifyJwt, upload.fields([
    {
        name:'image',
        maxCount:1
        
    },
    {
        name:'video',
        maxCount:1
    }
]), createCourse);
router.get('/', verifyJwt, getCourses);
router.get('/:courseId', verifyJwt, getCourse);
router.put('/:courseId', verifyJwt, updateCourse);
router.delete('/:courseId', verifyJwt, deleteCourse);

export default router;