const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

require('../DB/mongoose_connect');
const UserProfile = require('../DB/profile_schema.js');
const UserData = require('../DB/data_schema.js');

router.get('/', (req, res) => {
    res.send('HOME PAGE');
})

router.post('/login', async (req, res) => {
    const name = req.body.username;
    const pass = req.body.password;
    try {
        let token;

        if(!name || !pass)
            return res.status(400).json({error: "All details are required"});
        
        const user = await UserProfile.findOne({username: name});
          

        if(user) {
            // console.log(user);
            const checkpass = await bcrypt.compare(pass, user.password);
            token = await user.generateAuthToken();
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            
            if(checkpass) {
                res.status(200).json({message: "Login successfully"});
            }
            else    
                res.status(401).json({error: "Wrong password"}); 
        }
        else{
            res.status(400).json({error: "User not found"});
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.post('/register', async (req, res) => {
    // console.log(req.body);
    const name = req.body.username;
    const pass = req.body.password;
    const gen = req.body.gender;
    const age = req.body.age;

    try {
        if(!name || !pass || !gen || !age)
            return res.status(400).json({error: "All details are required"});

        const user = await UserProfile.findOne({username: name});
        if(user)
            return res.status(422).json({error: "Username already registered"});

        const newuser = new UserProfile({
            username: name,
            password: pass,
            gender: gen,
            age: age
        });
        await newuser.save()

        const newdata = new UserData({
            username: name,
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

module.exports = router;