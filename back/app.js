const express = require('express');
const dotenv = require('dotenv');
var apis = require('./routes/route.js');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config({path: './config.env'});

app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use('/', apis);

app.listen(process.env.PORT, (req, res) =>{
    console.log(`Server is running at port ${process.env.PORT}`);
})