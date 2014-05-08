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
    // $('#goatForm').find(':input').val('');

    var formInfo = $('#goatForm').serializeObject();
    console.log(formInfo);

    var posting = $.post('/submitGoat', {
        formData: JSON.stringify(formInfo)
    });

    posting.done(function(data) {
        var returnedObj = JSON.parse(data);
        var $returnedMessage = $('<p>', {
            class: 'returnedMessage',
            text: returnedObj.message
        });
        $returnedMessage.css('display', 'none');
        $('#submitalContainer').append($returnedMessage);

        $('.returnedMessage').fadeIn(1500, function() {
            $('#submitGoat').removeAttr('disabled');
        })

    });


    // return false;
})