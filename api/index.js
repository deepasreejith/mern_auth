import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

import adminAuthRoutes from './routes/adminAuth.route.js'
import adminRoutes from './routes/admin.route.js'

import cookieParser from 'cookie-parser';
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connect to MongoDB')
})
.catch((err)=>{
    console.log(err)
})

const app = express();

app.use(express.json());

app.use(cookieParser());

app.listen(3000,()=>{
    console.log('Server listening on port 3000')
});

app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.use('/api/admin_auth',adminAuthRoutes);
app.use('/api/admin',adminRoutes)

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode,
    });
});