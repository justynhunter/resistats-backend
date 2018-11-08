var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Game = require('./api/models/gameModel'),
    Player = require('./api/models/playerModel'),
    bodyParser = require('body-parser');

// mongoose config
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/resistats');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routes
require('./api/routes/gameRoutes')(app);
require('./api/routes/playerRoutes')(app);

app.listen(port);

console.log('resists api started on: ' + port);