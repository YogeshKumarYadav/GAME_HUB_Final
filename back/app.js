const express = require('express');
const dotenv = require('dotenv');
const app = express();

dotenv.config({path: './config.env'});

app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(require('./routes/route.js'));

app.listen(process.env.PORT, (req, res) =>{
    console.log(`Server is running at port ${process.env.PORT}`);
})