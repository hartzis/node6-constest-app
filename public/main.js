// serialize to object function
$.fn.serializeObject = function() {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};


$(document).on('click', '#submitGoat', function(event) {
    event.preventDefault();
    $('.returnedMessage').remove()
    $('#submitGoat').attr('disabled', 'disabled');

    // copy form inputs to object
    var formInfo = $('#goatForm').serializeObject();
    console.log(formInfo);

    var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    formInfo.youtubeUrl = "//www.youtube.com/embed/" + formInfo.youtubeUrl.match(regExp)[7];
    console.log(formInfo.youtubeUrl);

    // clear form inputs
    $('#goatForm').find(':input').not('#submitGoat').val('');

    var posting = $.post('/submitGoat', {
        formData: JSON.stringify(formInfo)
    });

    // process returned json for posting
    posting.done(function(data) {
        var returnedObj = JSON.parse(data);

        if (returnedObj.isFull) {
            $('#submitalContainer').slideUp();
            $('.container').append('<div class="row"><div class="col-sm-6"><h3>Contest submission is now over! Please view and vote on submissions!</h3></div></div>');
        }

        var $returnedMessage = $('<p>', {
            class: 'returnedMessage',
            text: returnedObj.message
        });
        $returnedMessage.css('display', 'none');
        $('.container').append($returnedMessage);

        $('.returnedMessage').fadeIn(1500, function() {
            $('.returnedMessage').fadeOut(2000, function() {
                $('.returnedMessage').remove();
                $('#submitGoat').removeAttr('disabled');
            })
        })

    });


    // return false;
})