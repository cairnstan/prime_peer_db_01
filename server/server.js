var express = require('express');
var mongoose = require('mongoose');
var index = require('./routes/index');
var assignment = require('./routes/assignment');
var bodyParser = require('body-parser');

var app = express();

var MongoDB = mongoose.connect('mongodb://localhost/assignments').connection;

app.use(bodyParser.json());

app.use('/', index);
app.use('/assignments', assignment);
app.use(express.static('server/public'));

MongoDB.on('error', function (err){
  console.log('mongodb connection error:', err);
});

MongoDB.once('open', function(){
  console.log('mongodb connection open!');
});


var server = app.listen(3000, function(){
  var port = server.address().port;
  console.log("Listening on port", port);
});
