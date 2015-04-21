var lastId;

function load(params) {
    params = params || {};
    $.getJSON("http://www.reddit.com/r/pics/.json?jsonp=?", params, function (data) {
        var children = data.data.children;
        $.each(children, function (i, item) {
			if (item.data.url.toLowerCase().indexOf("http://i.imgur.com/") >= 0){
				if (item.data.url.toLowerCase().indexOf(".gifv") < 0){
					$("<img/>").attr("src", item.data.url).appendTo("#images");
				}
			}
        });
        if (children && children.length > 0) {
            lastId = children[children.length - 1].data.id;
        } else {
            lastId = undefined;
        }
    });
}

$(window).scroll(function () {
	if ($(window).scrollTop() >= $(document).height() - $(window).height() - 5) {
		if (lastId) {
			load({
				after: 't3_' + lastId
			});
		}
	}
});

load();