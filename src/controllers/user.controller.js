import mongoose,{isValidObjectId} from 'mongoose';
import {User} from '../models/user.model.js';
import {asyncHandler,ApiError,ApiResponse, uploadOnCloudinary} from '../utils/index.js';


const registerUser = asyncHandler(async(req, res)=> {
   const {name, email, password,role} = req.body;
   if(!name || !email || !password || !role) {
    throw new ApiError(400, 'All fields are required');
   }

   const user = await User.findOne({email});
   if(user) {
     throw new ApiError(409, 'User already exist');
   }

   console.log(req.file);
   const userProfileImageLocalPath = req.file.path;
   if(!userProfileImageLocalPath) {
    throw new ApiError(400, 'User profileImage file is required');
   }

   const userProfileImage = await uploadOnCloudinary(userProfileImageLocalPath);
   if(!userProfileImage) {
    throw new ApiError(400, 'User profileImage file is required');
   }

   const registeredUser = await User.create({
    name,
    email,
    password,
    profileImage:userProfileImage?.url,
    role
   });

   const createdUser = await User.findById(registeredUser._id).select('-password');



   return res.status(201)
   .json(new ApiResponse(200, {user:createdUser}, 'User register successfully'));
})


const loginUser = asyncHandler(async(req, res)=> {
   const {email, password} = req.body;
   if(!email || !password) {
    throw new ApiError(400, 'Both fields are required');
   }

   const user = await User.findOne({email});
   if(!user) {
    throw new ApiError(404, 'User does not exist');
   }

   const isPasswordCurrect = await user.isPasswordCurrect(password);
   if(!isPasswordCurrect) {
    throw new ApiError(401, 'Password is incurrect');
   }
   
   const loginUser = await User.findById(user._id).select('-password');
   const accessToken = await user.generateAccessToken();
   return res.status(200)
   .cookie("accessToken", accessToken)
   .json(new ApiResponse(200, {user:loginUser,accessToken}, 'User login successfully'));
   
})

const getUserProfile = asyncHandler(async(req, res)=> {
   const {userId} = req.params;
   if(!isValidObjectId(userId)) {
      throw new ApiError(400, 'Invalid user id');
   }

   const user = await User.findById(userId).select('-password');
   if(!user) {
      throw new ApiError(404, 'User does not exist');
   }

   return res.status(200)
   .json(new ApiResponse(200, {user}, 'User profile fetched successfully'));

})

const updateUserProfile = asyncHandler(async(req, res)=> {
   const {name, email} = req.body;
   if(!name || !email) {
      throw new ApiError(400, 'Both fields are required');
   }

   const user = await User.findByIdAndUpdate(
      req.user._id,
      {$set:{name, email}},
      {new:true}
   );

   return res.status(200)
   .json(new ApiResponse(200, {user}, 'User profile updated successfully'));
})

export {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile
}