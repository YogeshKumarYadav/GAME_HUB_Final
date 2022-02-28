const jwt = require('jsonwebtoken');
const User = require('../DB/profile_schema.js');
const UserData = require('../DB/data_schema.js');

const Authenticateuser = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET);
        const rootuser = await User.findOne({_id:verifyToken._id, "tokens:token":token});
        if(!rootuser) {
            throw new Error('User not found');
        }
        const userd = await UserData.findOne({userprofileid: rootuser._id});
        req.token = token;
        req.rootuser = rootuser; 
        req.userid = rootuser._id;
        req.userscore = userd;
        //console.log(req);
        next();

    }catch (err) {
        res.status(401).send('Unauthorized user');
        console.log(req.cookies.jwtoken);
        console.log("unauthorized");
    }
}

module.exports = Authenticateuser;