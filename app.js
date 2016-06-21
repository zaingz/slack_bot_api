var express = require('express');
var app = express();
var fs = require('fs');
var bootstrap = require('./helpers/bootstrap.js')();
var bodyParser = require('body-parser');




//routes
var slack_bot_router = require('./routes/slack/botRoutes.js');
var setup_router = require('./routes/setup/stepsRoutes.js');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(__dirname + '/client/public'));


app.use('/slack',slack_bot_router);

app.use('/setup',setup_router);

app.get('/', function(req, res) {
  res.send('index.html');
});





app.listen(3000, function () {
  console.log('Magic happens on port 3000!');
});
