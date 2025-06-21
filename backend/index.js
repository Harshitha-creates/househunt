import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import moment from 'moment';
import authRouter from './Routes/authRoutes.js';
dotenv.config();
const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT,()=>{
        console.log("Server is running");
    });
})
.catch((err)=>{
    console.log(err);
});

app.use('/auth', authRouter);
