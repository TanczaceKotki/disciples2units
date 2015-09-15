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
    $('.pull-right').append('<div class="btn btn-primary add-row"><span class="glyphicon glyphicon-plus"></span></div>');
    $('.edit').editable({
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
    $('.add-row').click(function(e){
        $.post("/add-unit", {
                profession: $(this).closest('.bootstrap-table').prev().text().toLowerCase(),
                fraction: $('.frac_name').html()
            }
        );
    });
});

$.fn.editable.defaults.mode = 'inline';