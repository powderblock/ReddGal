var lastId;
var urls = [];

function load(params) {
    params = params || {};
    //If this gets called and textbox.value is empty, declare a var and set it equal to textbox.value:
	if (textbox.value.trim() === "") {
		var subreddit = "all";
	}else{
		var subreddit = textbox.value;
	}
	//Where subreddit is the subreddit the user types
	//subFilter is the current filter (hot, new, etc)
    $.getJSON("http://www.reddit.com/r/"+subreddit+"/"+$("#subFilter").val()+".json?limit=75", params, function (data) {
        var children = data.data.children;
        $.each(children, function (i, item) {
			//If the current url is not in the urls array
			if($.inArray(item.data.url, urls) == -1){
				urls.push(item.data.url);
				//LowerCase() so if the user puts in a link LiKE ThIS then the system will be able to handle it.
				var urlLower = item.data.url.toLowerCase();
				if (urlLower.indexOf(".jpeg") >= 0 ||
				urlLower.indexOf(".jpg") >= 0 ||
				urlLower.indexOf(".png") >= 0 &&
				urlLower.indexOf(".gifv") < 0){
					//If the NSFW box is checked, allow all the images!
					if($('#nsfw').is(":checked")){
						if(!$('#show_info').is(":checked")){
							$('#images').append('<div class="item"><a href='+item.data.url+' target="_blank"><img src='+item.data.url+'></img></a></div>');
						}else{ $('#images').append('<div class="item"><a href='+item.data.url+' target="_blank"><img src='+item.data.url+'></img></a><span class="caption">'+item.data.title+'<br><a href ="http://reddit.com'+item.data.permalink+'"target="_blank">View comments on reddit</a><br>Score: '+item.data.score+'</span></div>');}
					}
					//If the NSFW box is not checked, only show items that aren't over_18 posts
					if(!$('#nsfw').is(":checked")){
						if(!item.data.over_18){
							if(!$('#show_info').is(":checked")){
								$('#images').append('<div class="item"><a href='+item.data.url+' target="_blank"><img src='+item.data.url+'></img></a></div>');
							}else{ $('#images').append('<div class="item"><a href='+item.data.url+' target="_blank"><img src='+item.data.url+'></img></a><span class="caption">'+item.data.title+'<br><a href ="http://reddit.com'+item.data.permalink+'"target="_blank">View comments on reddit</a><br>Score: '+item.data.score+'</span></div>');}
						}
					}
				}
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
	if ($(window).scrollTop() >= $(document).height() - $(window).height() - 600) {
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
	urls = [];
	$("#images").html("");
}

function search(){
	cleanImages();
	load();
}


//Check if key pressed
function wasEnter(key) {
	//Was the enter key the key press?
    if (key.keyCode == 13) {
		//If so, call these functions
		cleanImages();
		load();
        return false;
    }
}