const express = require("express");
const fs = require("fs");
const { users } = require("./src/demoData");

const PORT = 4000;
const app = express();

const userSchema = require("./src/Validation/validation");
const validation = require("./src/Middleware/middleware");


app.use(express.json());

// getting all users
app.get("/users", (_, res) => {
  res.json(users);
});

// getting single user
app.get("/users/:id", (req, res) => {
  const user = users.find((_user) => parseInt(req.params.id) === _user.id);
  if (!user) {
    return res.json({ error: "User not found" });
  }
  res.json(user);
});

app.put("/users/:id",validation(userSchema),(req, res) => {

  const user = {
    age: req.body.age,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };
 
  const userId = users.find((_user) => parseInt(req.params.id) === _user.id);
  
  if (!userId) {
    return res.json({ error: "User not exists !" });
  }else{
    
    const index = users.findIndex(p => p.id == parseInt(req.params.id))

    const id = { id: parseInt(req.params.id)}
    const age = {age: req.body.age}
    const email = {email: req.body.email}
    const firstName = {firstName: req.body.firstName}
    const lastName = {lastName: req.body.lastName}
    
    users[index] = { ...id, ...age, ...email, ...firstName, ...lastName, ...user }

    res.json(user);
  }

});

app.delete("/users/:id", (req, res) => {
  const user = users.find((_user) => parseInt(req.params.id) === _user.id);
  if (!user) {

    return res.json({ error: "User not found" });

  }else{

    const index = users.findIndex(p => p.id == parseInt(req.params.id))
    users.splice(index,1)

    res.json({ msg: "Deleted"});

  }
 
});

// TODO: Send erorr message when email already exists
// adding user
app.post("/user", validation(userSchema),(req, res) => {
  const user = {
    id: Math.floor(Math.random() * 100000),
    age: req.body.age,
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  };

  const checkEml = users.find((_user) => req.body.email === _user.email);
  if (!checkEml) {
    users.push(user);
    res.json(user);
  }else{
    return res.json({ error: "Email already exists !" });
  }


});

// TODO: Create a route to delete a single user
// TODO: Create a route to update single user
// TODO: Add validation in request data
// TODO: Refactor code

app.listen(PORT, () => console.log(`Alive on port ${PORT} 🚀`));
