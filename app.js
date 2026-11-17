import express from 'express';
import mongoose from 'mongoose';



// Middleware to parse incoming JSON payloads
// app.use(express.json());
const app = express();
const port = 4000;
app.use(express.json());


// connecting data base and schema
const dbConnection = mongoose.connect('mongodb+srv://parasharankita92_db_user:oX9UlQroc9EfTvn3@ankitacluster.waxg5ii.mongodb.net/')

if (dbConnection)
{
  console.log("database is connected")

}
else{
   console.log("database is not connected")
}
//creating schema

const schema = new mongoose.Schema({
name:{type:String,required:true},
  email:{type:String,required:true},
  phone:{type:Number,required:true}

})
const User = mongoose.model("newUser", schema)
// const record = [
//   { id: 1, name: "ankita" ,email:"ankita@gamil.com", phone:"9414489914"},

//   { id: 2, name: "parashar" ,email:"pr@gamil.com", phone:"9414489915"},

//   { id: 3, name: "yogendra" ,email:"yk@gamil.com", phone:"9414489916"},

//   { id: 4, name: "november" ,email:"november@gamil.com", phone:"9414489917"},

//   { id: 5, name: "poonam" ,email:"poonam@gamil.com", phone:"9414489918"},

//   { id: 6, name: "akshita" ,email:"aks@gamil.com", phone:"9554489918"},

// ];




// Define a basic GET route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//api to add data
app.post('/add', (req ,res) => {

    const {name , email , phone} = req.body;
     const newUser =   User.create({
            name:name,
            email:email,
            phone:Number(phone),
        })
if (newUser)
{
    res.status(201).json("added");

}
else{
  res.status(400).json("not added");
}
})
// api to delete data in existing array
app.delete('/delete/:id', (req ,res) => {

     const userId = parseInt(req.params.id);


  const userIndex = record.findIndex(user => user.id === userId);

  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  record.splice(userIndex, 1);


  res.status(200).json({ message: `User ${userId} deleted successfully` });
 

    // console(name,email,phone);

})

//update the particular server
app.patch('/update/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = record.find((u) => u.id === userId);

  // Return 404 if the item doesn't exist
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Merge existing user data with only the new fields provided
  Object.assign(user, req.body);

  res.status(200).json(user);
});

// update using put request
app.put('/update/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const userIndex = record.findIndex((u) => u.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { name, email,phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Name and email are required' });
  }

  // Replace the entire object while keeping the original ID
  record[userIndex] = { id: userId,
     name:req.body.name, 
     email:req.body.email,
     phone:req.body.phone };
  res.status(200).json(record[userIndex]);
});

// api to find details from the existing record
// app.get('/record/details', (req, res) => {
//   const { name,email,phone } = req.query;
//   // console.log(req.query)
// let results = [...record];
//   if (name) {
//     const filtered = record.filter(
//       item => item.name.toLowerCase() === name.toLowerCase()
//     );
//     return res.json(filtered);
//   }

//     if (email) {
//     const filtered = record.filter(
//       item => item.email.toLowerCase().includes(email.toLowerCase())
//     );
//      return res.json(filtered);
//   }

//     if (phone) {
//     const filtered = record.filter(
//       item => item.phone.toLowerCase().includes(phone
//         .toLowerCase())
//     );
//     return res.json(filtered);
//   }
//   res.json(record);
// }

// );
app.get("/record/details", (req, res) => {
  const queryParams = Object.keys(req.query);

  if (queryParams.length === 0) {
    return res
      .status(400)
      .json({ message: "Enter one or more search terms (name/email/phone)" });
  } else {
    const filtered = record.filter(
      (item) =>
        item[queryParams[0]].toLowerCase() ===
        req.query[queryParams[0]].toLowerCase(),
    );

    if (filtered.length === 0 || filtered !== record.filter) {
      return res.status(404).json({ message: "No record found" });
    }

    return res.json(filtered);
  }
});
// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});