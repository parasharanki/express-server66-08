import Router from "express";
import { registerUser,loginUser } from "../controllers/auth.js";



const authRouter = Router();

authRouter.post("/registerUser",registerUser)

authRouter.post("/login" ,loginUser)

export default authRouter;