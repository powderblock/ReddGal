var lastId;

function load(params) {
    params = params || {};
    $.getJSON("http://www.reddit.com/r/pics/.json?jsonp=?", params, function (data) {
        var children = data.data.children;
        $.each(children, function (i, item) {
		//LowerCase() so if the user puts in a link LiKE ThIS then the system will be able to handle it.
			if (item.data.url.toLowerCase().indexOf("http://i.imgur.com/") >= 0){
				if (item.data.url.toLowerCase().indexOf(".gifv") < 0){
					$('#images').append('<div class="item"><img src='+item.data.url+'></img></div>');
				}
			}
        });
        if (children && children.length > 0) {
			//Last id = the last element of the children ids.
			//Children in this case 
            lastId = children[children.length - 1].data.id;
        } else {
            lastId = undefined;
        }
    });
}

//Function to check scrolling:
$(window).scroll(function () {
	//If the user gets 5px above the bottom of the page:
	if ($(window).scrollTop() >= $(document).height() - $(window).height() - 5) {
		if (lastId) {
			//Load the next batch of posts:
			load({
				after: 't3_' + lastId
			});
		}
	}
});

//Call the load function
//This is the function that loads all the images into #images:
load();