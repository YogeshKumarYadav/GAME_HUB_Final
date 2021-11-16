const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE, {useNewUrlParser: true})
.then( () => {
    console.log(`MongoDB connected at ${process.env.DATABASE}`);
})
.catch((err) => {
    console.log(`MongoDb is not connected`);
    console.log(err);
});