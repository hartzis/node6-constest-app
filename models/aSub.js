var ASub = (function() {
    function ASub(uName, youtubeUrl, theTitle, theDescription) {
        this.username = uName;
        this.youtubeUrl = youtubeUrl;
        this.theTitle = theTitle;
        this.theDescription = theDescription;
        this.idKey = uName + theTitle;
        this.score = 0;
    }

    return ASub;
})();

module.exports = ASub;