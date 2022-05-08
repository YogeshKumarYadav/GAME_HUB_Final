const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();


require('../DB/mongoose_connect');
const UserProfile = require('../DB/profile_schema.js');
const UserData = require('../DB/data_schema.js');
const Authenticateuser = require('../middleware/authentication.js')

router.get('/', function(req, res) {
    res.send('HOME PAGE');
});

router.post('/user/login', async function(req, res) {
    const name = req.body.userid;
    const pass = req.body.password;
    try {
        let token;
        if(!name || !pass)
            return res.status(400).json({error: "All details are required"});
        
        const user = await UserProfile.findOne({userid: name});
        if(user) {
            // console.log(await bcrypt.compare(pass, user.password));
            // const checkpass = await bcrypt.compare(pass, user.password);
            // console.log(checkpass, user.password);
            if(pass == user.password) {
                token = await user.generateAuthToken();
                console.log(token);

                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 1000000),
                    httpOnly: true
                });
                res.status(200).json({message: "Login successfully"});
            }
            else {
                console.log(user.userid + "  Wrong password");
                res.status(401).json({error: " Wrong password"});
            } 
        }
        else{
            res.status(422).json({error: "User not found"});
        }
    }
    catch (err) {
        console.log(err);
    }
});

router.post('/user/register', async function(req, res) {
    let token;

    console.log("Register user fetched....");
    const name = req.body.name;
    const userid = req.body.userid;
    const pass = req.body.password;
    const email = req.body.email;
    const gen = req.body.gender;
    const age = req.body.age;
    const avatar = req.body.avatar;

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
            age: age,
            avatar: avatar
        });
        await newuser.save()

        const newdata = new UserData({
            userid: name,
            userprofileid: newuser._id,
            total: 0,
            gamescore: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        })
        await newdata.save();

        token = await newuser.generateAuthToken();
        console.log(token);

        res.cookie("jwtoken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        });

        res.status(201).json({message: "User registered succesfully"});

    }
    catch (err){
        console.log(err);
    }
});

router.get('/user/profile',Authenticateuser, function(req, res) {
    res.send({profile: req.rootuser, score: req.userscore});
});

router.get('/user/logout', function(req, res) {
    res.clearCookie('jwtoken', {path: '/'})
    res.status(200).send('user logout');
})

module.exports = router