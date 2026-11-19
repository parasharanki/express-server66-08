import express from 'express';
import connectToDB from "./config/db.js"
import userRouter from './routes/user.js';


// Middleware to parse incoming JSON payloads
// app.use(express.json());
const app = express();
const port = 4000;
app.use(express.json());

await connectToDB()

app.use("/",userRouter)

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});