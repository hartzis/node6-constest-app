var express = require('express');
var bodyParser = require('body-parser');

// include controllers
var mainController = require('./controllers/mainController.js');

// setup app
var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', mainController.getHome);

app.post('/submitGoat', mainController.postSubmitGoat)

app.post('/voteGoat', mainController.postVoteGoat)

app.get('/viewSubs', mainController.getViewSubs)

app.get('/winner', mainController.getWinner)

// setup for heroku
var port = Number(process.env.PORT || 9532);
var server = app.listen(port, function() {
    console.log('Express server listening on port ' + server.address().port);
});