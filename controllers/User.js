import User from "../model/user.js"

export function hello (req, res)  {
  res.send('Hello World!')
}
export function add (req ,res)  {

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
}}

export function deleteUser  (req ,res) {

     const userId = parseInt(req.params.id);


  const userIndex = record.findIndex(user => user.id === userId);

  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  record.splice(userIndex, 1);


  res.status(200).json({ message: `User ${userId} deleted successfully` });
 



}
export function updateUser (req, res)  {
  const userId = parseInt(req.params.id);
  const user = record.find((u) => u.id === userId);

  // Return 404 if the item doesn't exist
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Merge existing user data with only the new fields provided
  Object.assign(user, req.body);

  res.status(200).json(user);
} 
export function patchUser  (req, res) {
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
}
export function searchUser  (req, res) {
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
}