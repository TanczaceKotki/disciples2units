var jumboHeight = $('.jumbotron').outerHeight();
function parallax(){
    var scrolled = $(window).scrollTop();
    $('.bg').css('height', (jumboHeight-scrolled) + 'px');
}

$(window).scroll(function(e){
    parallax();
});

$(document).on('ready', function() {
    $("#img").fileinput({
        showUpload: false,
        previewFileType: "image",
        browseClass: "btn btn-success",
        browseLabel: "Pick Image",
        browseIcon: "<i class=\"glyphicon glyphicon-picture\"></i> ",
        removeClass: "btn btn-danger",
        removeLabel: "Delete",
        removeIcon: "<i class=\"glyphicon glyphicon-trash\"></i> "
    });
    $('.tab_leader').find('td').editable({
        type: 'text',
        url: '/edit-leader',
        defaultValue: '',
        emptytext: ''
    });
    $('.tab_unit').find('td').editable({
        type: 'text',
        url: '/edit-unit',
        defaultValue: '',
        emptytext: ''
    });
});

$.fn.editable.defaults.mode = 'inline';