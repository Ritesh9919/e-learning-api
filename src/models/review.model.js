import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
  rating:{
    type:Number,
    min:1,
    max:5,
    required:true
  },
  title:{
    type:String,
    trim:true,
    required:true,
    maxLength:100
  },
  comment:{
    type:String,
    required:true
  },
  course:{
    type:mongoose.Types.ObjectId,
    ref:'Course'
  },
  user:{
    type:mongoose.Types.ObjectId,
    ref:'User'
  }
},{timestamps:true});


export const Review = mongoose.model('Review', reviewSchema);