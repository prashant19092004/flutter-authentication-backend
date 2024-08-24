const mongoose = require('mongoose');
const express = require('express');
const userModel = require('./user.model.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

const connectDB = async() => {
    try{
        mongoose.connect("mongodb://127.0.0.1:27017/webservice");
        console.log("DB Connected");
    }
    catch(err){
        console.log(err);
    }
}

connectDB();

app.listen(9000, () => {
    console.log("server is live on port 9000");
})

app.get("/hello", (req, res) => {
    res.send("Hiii");
})

app.post("/signup", async(req, res) => {
    const {name, email, phone, password} = req.body;
    // console.log(req.body);

    const newUser = await userModel.create({
        name,
        email,
        phone, 
        password
    })

    console.log(newUser);
    // res.send("user signed up");
    res.json({ message : "User has created", newUser});
})