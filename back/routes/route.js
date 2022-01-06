const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

require('../DB/mongoose_connect');
const UserProfile = require('../DB/profile_schema.js');
const UserData = require('../DB/data_schema.js');

router.get('/', (req, res) => {
    res.send('HOME PAGE');
})

router.post('/user/login', async (req, res) => {
    const name = req.body.userid;
    const pass = req.body.password;
    try {
        let token;

        if(!name || !pass)
            return res.status(400).json({error: "All details are required"});
        
        const user = await UserProfile.findOne({userid: name});
          

        if(user) {
            console.log(user);
            const checkpass = await bcrypt.compare(pass, user.password);
            token = await user.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            
            if(user.password === pass) {
                res.status(200).json({message: "Login successfully"});
            }
            else {
                res.status(401).json({error: "Wrong password"});
            } 
        }
        else{
            res.status(422).json({error: "User not found"});
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/user/register', async (req, res) => {
    console.log("Register user fetched....");
    const name = req.body.name;
    const userid = req.body.userid;
    const pass = req.body.password;
    const email = req.body.email;
    const gen = req.body.gender;
    const age = req.body.age;

    if(!name || !userid || !pass || !email || !gen || !age)
        return res.status(422).json({error: "All details are required"});

    try {  
        const user = await UserProfile.findOne({userid: userid});
        if(user)
            return res.status(409).json({message: "Username already registered"});

        const newuser = new UserProfile({
            name: name,
            userid: userid,
            password: pass,
            email: email,
            gender: gen,
            age: age
        });
        await newuser.save()

        const newdata = new UserData({
            userid: name,
            userprofileid: newuser._id,
            total: 0,
            gamescore: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        })
        await newdata.save();
        res.status(201).json({message: "User registered succesfully"});

    }
    catch (err){
        console.log(err);
    }
})

module.exports = router