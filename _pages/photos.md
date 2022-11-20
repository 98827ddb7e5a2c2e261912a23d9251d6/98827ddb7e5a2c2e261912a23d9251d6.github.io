---
layout: page
title: Highlighted Photos
permalink: /photos/
---

<script>
	// the list of images
	var imageList = 
	[
	  {
	    "url": "https://pbs.twimg.com/media/FfqB3WCaUAAhxaC?format=jpg&name=large",
	    "des": "a descriptions, supports <b>html</b>",
	    "date": "2013-06-10 00:00:00"
	  },
	  {
	    "url": "https://pbs.twimg.com/media/FfMi5v1UAAE1b1k?format=jpg&name=large",
	    "des": "another <del>useless</del> test",
	  }
	];
</script>

<style>
	/* dark theme baby */
	body {
		background: #000 !important;
	}
	h1, h2, h3 {
		color: #FFF !important;
	}
	.wrapper-footer {
		background: #222 !important;
	}

	/* filter */
	#filter {
		background-image: url(/images/grain.png);
		background-size: 400px 400px;
		height: 0%;
    height: calc(100% - 111px);
    margin-top: 111px;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 1;
    filter: contrast(2);
    mix-blend-mode: overlay;
	}

	/* styling photo list */
	.photo-children {
		max-width: 400px;
    margin: auto;
    margin-top: 50px;
    margin-bottom: 50px;
	}
	.photo-children>p{
		margin: 0;
		text-align: center;
		color: #aaa;
    font-size: 80%;
    margin-top: -5px;
	}
	.photo-date{
		font-size: 50%;
    opacity: 0.5;
    margin-top: 2px;
	}
</style>

<div id="filter"></div>
<div id="photo-list"></div>

<script>
	// utility to convert dates
	function timeDifference(previous, current = Date.now()) {
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;
    var elapsed = current - previous;
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }
    else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';   
    }
    else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';   
    }
    else {
         return Math.round(elapsed/msPerYear ) + ' years ago';   
    }
	}

	// parse image list
	imageList.forEach(function(item, index){
		if (item.date) {
			var dateHtml = `<p class="photo-date">`+timeDifference(Date.parse(item.date))+`</p>`;
		} else {
			var dateHtml = "";
		}
		var child = `
			<div class="photo-children">
				<img src="`+item.url+`"/>
				<p class="photo-des">`+item.des+`</p>
				`+dateHtml+`
			</div>
		`;
		document.getElementById("photo-list").innerHTML = document.getElementById("photo-list").innerHTML + child;
	});
</script>