const  mongoose = require('mongoose');

const UserDataSchema = new mongoose.Schema({
    userid: String,
    userprofileid: String,
    total: Number,
    gamescore: []
});
const UserData = new mongoose.model('userdata', UserDataSchema);

module.exports = UserData;