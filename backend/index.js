//Importing Variables 
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

dotenv.config();


//ImPortant Data Importing from process var
var PORT = process.env.PORT;
var mongoURI = process.env.mongoURI;


//Express App setup 
var app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



// Importing routes

const routes = require('./routes')





// using routes

app.use(routes);




//DataBase Connection
mongoose.connect(mongoURI , {
    useCreateIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology : true
}).then(() => {
    console.log('DataBase Connected!!');
}).catch(err => {console.log("ERR : "+ err)});


var server = app.listen(PORT , () => {
    console.log('Server at ' + PORT);
})
