import { Schema , model} from "mongoose";
 const productSchema =new Schema({
    name:{
        type: String
    },
    slug:{
        type:String,
        required:true,
       
    },
    category:{
         type:String,
        required:true,
    },
actualPrice:{
         type:String,
        required:true,
    },
    discountedPrice:{
         type:String,
        required:true,
    },
    description:{
        type:String,
       

    }








 },
 {timestamps:true}
);
 const Product = model("product",productSchema)
 export default Product