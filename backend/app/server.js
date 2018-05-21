const express = require('express');
const bodyParser = require('body-parser');
const Router = require('express').Router;
const cors = require('cors');

this.router = new Router();
// create express app
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
// Configure cors
let corsOptions = {
    'origin': process.env.web_domain,
    'methods': ['GET', 'POST', 'PUT', 'DELETE'],
    'allowedHeaders': ['Content-Type'],
    'credentials': true
};
app.use(cors(corsOptions));

// Configuring the database
const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

app.use('/api', this.router);

// define a simple route
this.router.get('/', (req, res) => {
    res.json({"message": "Movie Library.  Use this to store your movie collection."});
});

// define health-check endpoint
this.router.get('/healthz', (req, res) => {
    res.send("OK");
});

require('./routes/movie.routes.js')(this.router);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});