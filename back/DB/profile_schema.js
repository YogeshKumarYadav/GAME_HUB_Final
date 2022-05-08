const  mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserProfileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userid: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    avatar: {
        type: Number,
        require: true
    },
    tokens: [
        {
            token: {
                type: String,
                require: true
            }
        }
    ]
});

// UserProfileSchema.pre('save', async function (next) {
//     try {
//         const p = this.password;
//         this.password = await bcrypt.hash(this.password, 10);
//         next();
//     }
//     catch(err) {
//         next(err);
//     }
// });

UserProfileSchema.methods.generateAuthToken = async function () {
    try {
        let newtoken = jwt.sign({_id: this._id}, process.env.SECRET)
        this.tokens = this.tokens.concat({token: newtoken});
        await this.save();
        return newtoken;
    }
    catch(err) {
        console.log(err);
    }
}

const UserProfile = new mongoose.model('userprofile', UserProfileSchema);

module.exports = UserProfile;