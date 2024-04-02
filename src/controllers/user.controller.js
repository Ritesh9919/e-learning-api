import {User} from '../models/user.model.js';
import {asyncHandler,ApiError,ApiResponse, uploadOnCloudinary} from '../utils/index.js';


const registerUser = asyncHandler(async(req, res)=> {
   const {name, email, password} = req.body;
   if(!name || !email || !password) {
    throw new ApiError(400, 'All fields are required');
   }

   const user = await User.findOne({email});;
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
    profileImage:userProfileImage?.url
   })

   return res.status(201)
   .json(new ApiResponse(200, {user:registeredUser}, 'User register successfully'));
})




export {
    registerUser
}