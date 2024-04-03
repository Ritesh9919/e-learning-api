import mongoose from "mongoose";


const enrollmentSchema = new mongoose.Schema({
 user:{
    type:mongoose.Types.ObjectId,
    ref:'User'
 },
 course:{
    type:mongoose.Types.ObjectId,
    ref:'Course'
 }
},{timestamps:true});


export const Enrollment = mongoose.model('Enrollment', enrollmentSchema);