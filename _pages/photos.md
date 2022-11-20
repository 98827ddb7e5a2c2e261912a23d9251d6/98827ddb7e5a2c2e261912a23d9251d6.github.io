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
</style>

<div id="filter"></div>
<div id="photo-list"></div>

<script>
	// parse image list
	imageList.forEach(function(item, index){
		if (item.date) {
			var dateHtml = `<p class="photo-date">`+item.date+`</p>`;
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