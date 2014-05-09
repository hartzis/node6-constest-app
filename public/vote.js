$(document).on('click', '.vote', function() {

    var $thisBtn = $(this);
    // disable button till post finishes
    $thisBtn.attr('disabled', 'disabled');
    var idKey = $thisBtn.closest('.submission').attr('data-idKey');
    console.log(idKey);

    // send post vote to server
    var posting = $.post('/voteGoat', {
        theVote: JSON.stringify({
            idKey: idKey
        })
    });

    // process returned json for posting
    posting.done(function(data) {
        var returnedObj = JSON.parse(data);
        // find vote dom
        var findDataKey = '[data-idKey="' + returnedObj.idKey + '"]'
        // change vote count
        $(findDataKey).find('.current-votes').text(returnedObj.votes);
        // re-enable vote button after a few seconds
        setTimeout(function() {
            $(findDataKey).find('.vote').removeAttr('disabled')
        }, 2500)
    });

})