import mongoose,{isValidObjectId} from 'mongoose';
import {Course} from '../models/course.model.js';
import {User} from '../models/user.model.js';
import {asyncHandler, ApiError, ApiResponse,uploadOnCloudinary} from '../utils/index.js';



const createCourse = asyncHandler(async(req, res)=> {
    const {title, description, category, price, level, instructor} = req.body;
    if(!title || !description || !category || !price || !level || !instructor) {
        throw new ApiError(400, 'All fields are required');
    }
    const user = await User.findById(req.user._id);
    if(user.role !== 'Admin') {
        throw new ApiError(400, 'Only admin can create course');
    }

    const courseImageLocalPath = req.files?.image[0]?.path;
    if(!courseImageLocalPath) {
        throw new ApiError(400, 'Course image file is required');
    }

    const courseImage = await uploadOnCloudinary(courseImageLocalPath);
    if(!courseImage.url) {
        throw new ApiError(400, 'Error while uploading image on cloudinary');
    }

    const courseVideoLocalPath = req.files?.video[0]?.path;
    if(!courseVideoLocalPath) {
        throw new ApiError(400, 'Course video file is required');
    }

    const courseVideo = await uploadOnCloudinary(courseVideoLocalPath);
    
    if(!courseVideo.url) {
        throw new ApiError(400, 'Error while uploading video on cloudinary');
    }

    
    

    const course = await Course.create({
        title,
        description,
        category,
        price,
        level,
        instructor,
        image:{key:courseImage.public_id, url:courseImage.url},
        video:{key:courseVideo.public_id, url:courseVideo.url},
        duration:courseVideo?.duration
    })

    return res.status(201)
    .json(new ApiResponse(200, {course}, 'Course created successfully'));
})

const getCourses = asyncHandler(async(req, res)=> {

})


const getCourse = asyncHandler(async(req, res)=> {
    const {courseId} = req.params;
    if(!isValidObjectId(courseId)) {
        throw new ApiError(400, 'Invalid course id');
    }

    const course = await Course.findById(courseId);
    if(!course) {
        throw new ApiError(404, 'Course does not exist');
    }

    return res.status(200)
    .json(new ApiResponse(200, {course}, 'Course fetched successfully'));
})

const updateCourse = asyncHandler(async(req, res)=> {
     const {title, description, price, category, level} = req.body;
     const {courseId} = req.params;
     if(!isValidObjectId(courseId)) {
        throw new ApiError(400, 'Invalid course id');
     }

     if(!title || !description || !price) {
        throw new ApiError(400, 'All fields are required');
     }

     const user = await User.findById(req.user._id);
     if(user.role !== 'Admin') {
        throw new ApiError(400, 'Only admin can update course');
     }

     const coures = await Course.findByIdAndUpdate(
        courseId,
        {$set:{title,description,price}},
        {new:true}
     )

     return res.status(200)
     .json(new ApiResponse(200, {coures}, 'Course updated successfully'));
})


const deleteCourse = asyncHandler(async(req, res)=> {

})


export {
    createCourse,
    getCourse,
    getCourses,
    updateCourse,
    deleteCourse
}