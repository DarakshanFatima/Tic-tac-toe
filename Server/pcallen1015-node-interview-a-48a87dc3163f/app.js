const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/arcade', (error) => {
    if (error) {
        console.log('ERROR');
        console.log(error);
        process.exit(1);
    }
    console.log('Database Connected');
})

const app = express();
var cors = require('cors');
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Models
require('./models/win.model');

// Middleware

// Routes
const winRoutes = require('./routes/wins.routes');
app.use('/wins', winRoutes);
module.exports = app;

app.listen(8080, () => console.log('Arcade server running on port 8080'));