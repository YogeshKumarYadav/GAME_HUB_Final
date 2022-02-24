const jwt = require('jsonwebtoken');
const User = require('../DB/profile_schema.js')

const Authenticateuser = async (req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifytoken = jwt.verify(token, process.env.SECRET);
        const rootuser = await User.findOne({_id:verifytoken, "tokens.token":token});
        if(!rootuser) {
            throw new Error('User not found');
        }
        req.token = token;
        req.rootuser = rootuser;
        req.userid = rootuser._id;
        next();

    }catch (err) {
        res.status(401).send('Unauthorized user');
        console.log(err);
    }
}

module.exports = Authenticateuser;