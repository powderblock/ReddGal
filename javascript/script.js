var lastId;

function load(params) {
    params = params || {};
    //If this gets called and textbox.value is empty, declare a var and set it equal to textbox.value:
	if(textbox.value == ""){
		var subreddit = "all";
	}else{
		var subreddit = textbox.value;
	}
    $.getJSON("http://www.reddit.com/r/"+subreddit+"/.json?limit=75", params, function (data) {
        var children = data.data.children;
        $.each(children, function (i, item) {
		//LowerCase() so if the user puts in a link LiKE ThIS then the system will be able to handle it.
			if (item.data.url.toLowerCase().indexOf(".jpeg") >= 0 || item.data.url.toLowerCase().indexOf(".jpg") >= 0 || item.data.url.toLowerCase().indexOf(".png") >= 0 && item.data.url.toLowerCase().indexOf(".gifv") < 0){
				$('#images').append('<div class="item"><img src='+item.data.url+'></img><span class="caption">'+item.data.title+'<br>Score: '+item.data.score+'</span></div>');
			}
        });
        if (children && children.length > 0) {
			//Last id = the last element of the children ids.
			//Children in this case 
            lastId = children[children.length - 1].data.id;
        } else { lastId = undefined; }
	});
}

//Function to check scrolling:
$(window).scroll(function () {
	//If the user gets 5px above the bottom of the page:
	if ($(window).scrollTop() >= $(document).height() - $(window).height() - 5) {
		if (lastId) {
			//Load the next batch of posts:
			load({ after: 't3_' + lastId });
		}
	}
});

//Call the load function
//This is the function that loads all the images into #images:
load();

//This function just removes everything in the div
//This pretty much will remove the images.
function cleanImages(){
	$("#images").html("");
}

function search(){
	cleanImages();
	load();
}

function wasEnter(key) {
    if (key.keyCode == 13) {
		cleanImages();
		load();
        return false;
    }
}
