var getActiveNav = function(cPage, aPage) {
    return (cPage === aPage) ? 'active' : '';
}

// include submission tracking 'models'
var Submissions = require('../models/submissions.js')

// setup initial holding for all submissions
var allSubs = new Submissions();

// require the aSub model
var ASub = require('../models/aSub.js')

module.exports = {
    postSubmitGoat: function(req, res) {
        var info = JSON.parse(req.body.formData);
        console.log(info);
        allSubs.add(new ASub(info.userName, info.youtubeUrl, info.title, info.description))
        var isFull = allSubs.submissions.length >= 4 ? true : false;
        var sendInfo = {
            message: 'Thank You ' + info.userName + ' for your submission!',
            isFull: isFull
        };
        res.send(JSON.stringify(sendInfo));
    },
    getHome: function(req, res) {
        var isFull = allSubs.submissions.length >= 4 ? true : false;
        res.render('index', {
            isFull: isFull,
            cPath: req.path,
            getActiveNav: getActiveNav
        });
    },

    getViewSubs: function(req, res) {
        console.log(allSubs.submissions);
        res.render('viewSubs', {
            cPath: req.path,
            getActiveNav: getActiveNav,
            allSubs: allSubs.submissions
        });
    },

    getWinner: function(req, res) {
        res.render('winner', {
            cPath: req.path,
            getActiveNav: getActiveNav
        });
    }
}