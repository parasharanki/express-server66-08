import mongoose from "mongoose";
const schema = new mongoose.Schema({
name:{type:String,required:true},
  email:{type:String,required:true},
  phone:{type:Number,required:true}

})
const User = mongoose.model("newUser",schema)
export default User;