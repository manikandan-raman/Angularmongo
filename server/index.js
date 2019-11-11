const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 1234;
const mongoUrl = 'mongodb://localhost:27017/notes_system';

const app = express();
app.use(cors());

//CORS config
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE,HEAD,OPTIONS");
    res.header("Access-Control-Allow-Headers","*");
    next();
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let notesRoutes = require('./routes/notes_routes');

app.use('/notes',notesRoutes);

mongoose.connect(mongoUrl,{
        useNewUrlParser : true,
        useUnifiedTopology: true
    },() => console.log('Mongoose DB is up and running  '));

    var db = mongoose.connection;

// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")
    
app.listen(port,() => console.log('The server is up and running'));