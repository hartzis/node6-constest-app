var ASub = (function() {
    function ASub(infoObj) {
        this.username = infoObj.userName;
        this.youtubeUrl = infoObj.youtubeUrl;
        this.theTitle = infoObj.title;
        this.theDescription = infoObj.description;

        this.idKey = this.username + this.theTitle + (Math.random() * 1000000).toFixed(0);
        this.votes = 0;
    }

    return ASub;
})();

module.exports = ASub;