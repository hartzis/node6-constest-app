var express = require('express');
var bodyParser = require('body-parser');

// include submission tracking 'models'
var Submissions = require('./model/submissions.js')
var ASub = require('./model/aSub.js')

// setup initial holding for all submissions
var allSubs = new Submissions();

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser());

app.get('/', function(req, res) {
    console.log(res.statusCode);
    var isFull = allSubs.submissions.length >= 2 ? true : false;
    res.render('index', {
        isFull: isFull
    });
});

app.post('/submitGoat', function(req, res) {
    res.redirect('/');
    var info = req.body;
    console.log(info);
    allSubs.add(new ASub(info.userName, info.title, info.youtubeUrl, info.description))
    for (var i = 0; i < allSubs.submissions.length; i++) {
        console.log(allSubs.submissions[i]);
    };

})

app.get('/viewSub', function(req, res) {
    res.render('viewSub');
})

var server = app.listen(9532, function() {
    console.log('Express server listening on port ' + server.address().port);
});