import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import moment from 'moment';
import authRouter from './Routes/authRoutes.js';
import generalRouter from './Routes/generalRoutes.js';
import ownerRouter from './Routes/ownerRoutes.js';
import checkAuth from './middleware/authMiddleware.js';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next();
});
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

app.use(checkAuth)

app.use('/general', generalRouter);
app.use('/owner',ownerRouter)
