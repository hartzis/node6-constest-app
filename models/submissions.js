var _ = require('lodash');

// create tweet class
var Submissions = (function() {
    function Submissions() {
        this.submissions = [];

    }
    Submissions.prototype.add = function(sub) {
        this.submissions.unshift(sub);
    };
    Submissions.prototype.clearSubmissions = function() {
        this.submissions = [];
    };
    // find video by key and return it
    Submissions.prototype.findByIdKey = function(key) {
        var sub = this.submissions.filter(function(a) {
            return a.idKey === key
        })[0];
        return sub;
    };
    Submissions.prototype.winners = function() {
        var sorted = _.sortBy(this.submissions, 'votes');
        console.log(sorted);
        return sorted;
    };
    return Submissions;
})();

module.exports = Submissions;