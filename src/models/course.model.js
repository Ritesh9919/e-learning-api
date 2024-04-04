import mongoose from 'mongoose'


const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        min:20,
        max:100
    },
    category:{
        type:String,
        enum:['Web Development', 'Data Science', 'Machine Learning'],
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    
    level:{
        type:String,
        required:true,
        enum:['Beginner', 'Intermediate', 'Advanced']
    },
    instructor:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    image:{
        type:Object,
        required:true
    },
    video:{
        type:Object,
        required:true
    },
    duration:{
        type:Number,
        required:true

    
    }


},{timestamps:true});

export const Course = mongoose.model('Course', courseSchema);