import Router from "express";

import {hello,add ,deleteUser,updateUser,patchUser,searchUser} from "../controllers/User.js"

const userRouter = Router();

userRouter.get("/",hello)

userRouter.post("/add" ,add)
 userRouter.delete('/delete/:id',deleteUser )
userRouter.patch('/update/:id', updateUser);
userRouter.put('/update/:id',patchUser)
userRouter.get("/record/details",searchUser);
export default userRouter;