import mongoose from "mongoose";

async function connectToDB(){ await mongoose.connect('mongodb://parasharankita92_db_user:oX9UlQroc9EfTvn3@ac-cowitrx-shard-00-00.waxg5ii.mongodb.net:27017,ac-cowitrx-shard-00-01.waxg5ii.mongodb.net:27017,ac-cowitrx-shard-00-02.waxg5ii.mongodb.net:27017/?ssl=true&replicaSet=atlas-14gzx5-shard-0&authSource=admin')

if (connectToDB)
{
  console.log("database is connected")

}
else{
   console.log("database is not connected")
}
}
export default  connectToDB