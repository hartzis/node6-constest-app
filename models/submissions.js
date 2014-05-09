var _ = require('lodash');

// create tweet class
var Submissions = (function() {
    function Submissions() {
        this.submissions = [];

    }
    Submissions.prototype.add = function(sub) {
        this.submissions.unshift(sub);
    };
    return Submissions;
})();

module.exports = Submissions;