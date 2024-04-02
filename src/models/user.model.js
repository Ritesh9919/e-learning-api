import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    
  },
  email:{
    type:String,
    required:true,
    unique:true

  },
  password:{
    type:String,
    required:true,
    min:8,
    max:12
  },
  profileImage:{
    type:String,
    required:true
  }
},{timestamps:true});


export const User = mongoose.model('User', userSchema);