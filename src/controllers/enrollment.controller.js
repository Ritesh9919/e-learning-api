import mongoose,{isValidObjectId} from 'mongoose';
import {Enrollment} from '../models/enrollment.model.js';
import {User} from '../models/user.model.js';
import {Course} from '../models/course.model.js'
import {asyncHandler,ApiError,ApiResponse, sendMail} from '../utils/index.js';


const enrollment = asyncHandler(async(req, res)=> {
    const {courseId} = req.params;
    if(!isValidObjectId(courseId)) {
        throw new ApiError(400, 'Invalid course id');
    }
   
    const course = await Enrollment.findOne({user:req.user._id, course:courseId});
    if(course) {
        throw new ApiError(400, 'You are already enrolled in this course');
    }

    const enrollment = await Enrollment.create({
        user:req.user._id,
        course:courseId
    })
    const user = await User.findById(req.user._id);
    await sendMail({email:user.email, emailType:'ENROLLMENT'})

    return res.status(201)
    .json(new ApiResponse(200, {enrollment}, 'Enrollment succesfully'));
})


const getEnrolledCourse = asyncHandler(async(req, res)=> {
    console.log(req.user);
    const enrolledCourses = await Enrollment.find({user:req.user._id}).populate('course');
    if(!enrolledCourses) {
        throw new ApiError(400, 'You are enrolled in any course yet');
    }

    return res.status(200)
    .json(new ApiResponse(200, {enrolledCourses}, 'Enrolled courses fetched successfully'));
})

export{
    enrollment,
    getEnrolledCourse
}