
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routes/userRoutes.js';
import { errorMiddleware } from './middlewares/error.js'; 
import cookieParser from 'cookie-parser';
import cloudinary from "cloudinary"
import productRouter from './routes/productRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import cors from 'cors';

dotenv.config({
    path :'./data/.env'
})

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    // origin: [process.env.FRONTEND_URI_1, process.env.FRONTEND_URI_2],
  })
);
const PORT = process.env.PORT;


// connect db

async function connectDB(){
  try{
    const { connection } = await mongoose.connect(process.env.MONGOURL)
    console.log("hello")
    console.log(`db connected at ${connection.port}`)
  } catch(err){
    console.log(`something err in connecting db -- ${err}`)
  }

}
connectDB();

// cloudinary setup
cloudinary.v2.config({
  cloud_name : process.env.CLOUDINARY_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET
 })


// routes
app.use('/api/v1/user', userRouter)
app.use('/api/v1/product', productRouter)
app.use('/api/v1/order', orderRouter)



// error middleware 
// it would be in last only
app.use(errorMiddleware)


app.listen(PORT,()=>{
    console.log(`server started at ${PORT}`)
})