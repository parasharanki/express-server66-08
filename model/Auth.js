import { Schema , model} from "mongoose";
 const authSchema =new Schema({
    name:{
        type: String
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
         type:String,
        required:true,
    },







 },
 {timestamps:true}
);
 const Auth = model("auth",authSchema)
 export default Auth