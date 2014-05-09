var getActiveNav = function(cPage, aPage) {
    return (cPage === aPage) ? 'active' : '';
}

// include submission tracking 'models'
var Submissions = require('../models/submissions.js')

// setup initial holding for all submissions
var allSubs = new Submissions();

// require the aSub model
var ASub = require('../models/aSub.js')

allSubs.add(new ASub({
    userName: "me",
    youtubeUrl: "//www.youtube.com/embed/G_pnX55avyk",
    title: "vined goats",
    description: "this is the awesome"
}))
allSubs.add(new ASub({
    userName: "me",
    youtubeUrl: "//www.youtube.com/embed/G_pnX55avyk",
    title: "vined goats2",
    description: "this is the awesome"
}))
allSubs.add(new ASub({
    userName: "me",
    youtubeUrl: "//www.youtube.com/embed/G_pnX55avyk",
    title: "vined goats3",
    description: "this is the awesome"
}))
allSubs.add(new ASub({
    userName: "me",
    youtubeUrl: "//www.youtube.com/embed/G_pnX55avyk",
    title: "vined goats4",
    description: "this is the awesome"
}))
for (var i = 0; i < allSubs.submissions.length; i++) {
    allSubs.submissions[i].votes += i
};

module.exports = {
    postSubmitGoat: function(req, res) {
        var info = JSON.parse(req.body.formData);
        allSubs.add(new ASub(info));
        var isFull = allSubs.submissions.length >= 6 ? true : false;
        var sendInfo = {
            message: 'Thank You ' + info.userName + ' for your submission!',
            isFull: isFull
        };
        res.send(JSON.stringify(sendInfo));
    },
    postVoteGoat: function(req, res) {
        var info = JSON.parse(req.body.theVote);
        var theVideo = allSubs.findByIdKey(info.idKey);
        theVideo.votes += 1;
        var sendInfo = {
            idKey: theVideo.idKey,
            votes: theVideo.votes
        };
        res.send(JSON.stringify(sendInfo));
    },
    getHome: function(req, res) {
        var isFull = allSubs.submissions.length >= 6 ? true : false;
        res.render('index', {
            isFull: isFull,
            cPath: req.path,
            getActiveNav: getActiveNav
        });
    },

    getViewSubs: function(req, res) {
        res.render('viewSubs', {
            cPath: req.path,
            getActiveNav: getActiveNav,
            allSubs: allSubs.submissions
        });
    },

    getWinner: function(req, res) {
        var winningSubs = allSubs.winners();
        res.render('winner', {
            cPath: req.path,
            getActiveNav: getActiveNav,
            allSubs: winningSubs
        });
    }
}