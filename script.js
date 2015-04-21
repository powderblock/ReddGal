var lastId;

function load(params) {
    params = params || {};
    $.getJSON("http://www.reddit.com/r/pics/.json?jsonp=?", params, function (data) {
        var children = data.data.children;
        $.each(children, function (i, item) {
            $("<img/>").attr("src", item.data.url).appendTo("#images");
        });
        if (children && children.length > 0) {
            lastId = children[children.length - 1].data.id;
        } else {
            lastId = undefined;
        }
    });
}

load();

$('.after').click(function () {
    if (lastId) {
        load({
            after: 't3_' + lastId
        });
    }
})