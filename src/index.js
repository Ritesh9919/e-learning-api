// core module
import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// internal modules
import {connectDB} from './db/index.js';
import loggerMiddleware from './middlewares/logger.middleware.js'

// routers
import userRouter from './routes/user.route.js';
import courseRouter from './routes/course.route.js';
import enrollmentRouter from './routes/enrollment.route.js'


const app = express();


// Use cloudinary
import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  });


 // application level middlewares 
app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(cookieParser());


app.get('/', (req, res)=> {
    res.send('Hello World');
})


// routers
app.use('/api/users', userRouter);
app.use('/api/courses', courseRouter);
app.use('/api/enroll/courses', enrollmentRouter)



connectDB()
.then(()=> {
    app.listen(process.env.PORT || 8000, ()=> {
        console.log(`Server is running on port:${process.env.PORT}`);
    })
})
.catch((err)=> {
    console.log('MongoDB connection failed', err);
})


