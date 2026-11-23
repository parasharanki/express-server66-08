import express from 'express';
import connectToDB from "./config/db.js"
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import productRouter from './routes/products.js';
import cors from "cors";
import "dotenv/config";
import cookieParser from 'cookie-parser';


// Middleware to parse incoming JSON payloads
// app.use(express.json());
const app = express();
const port = 4000;
const corsOptions ={
  origin: process.env.FRONTEND_URL,
  credentials:true,
};
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json());

await connectToDB()

app.use("/",userRouter)
app.use("/auth",authRouter)
app.use("/product",productRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});