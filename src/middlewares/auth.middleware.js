import {User} from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import {ApiError} from '../utils/index.js';


export const verifyJwt = async(req, res,next)=> {
    try {
        const token = req.cookies?.accessToken || req.header['Authorization']?.replace("Bearer ", "");
        if(!token) {
            throw new ApiError(401, 'Unauthorized request');
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken.userId).select('-password');
        if(!user) {
            throw new ApiError(401, 'Invalid token');
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(401, 'Inavalid token');
    }
}