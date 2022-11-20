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
	body {
		background: #000 !important;
	}
	h1, h2, h3 {
		color: #FFF !important;
	}
	.wrapper-footer {
		background: #222 !important;
	}

	.photo-item>img::before {
		  background-image: url(/images/grain.png);
		  height: 100%;
		  width: 100%;
		  position: absolute;
		  top: 0;
		  left: 0;
		  mix-blend-mode: overlay;
	}
	.photo-item{ 
		filter: blur(0.5px);
	}
</style>

<div id="photo-list"></div>

<script>
	// parse image list
	imageList.forEach(function(item, index){
		var child = `
			<div class="photo-children">
				<img scr="`+item.url+`"/>
				<p class="photo-des">`+item.des+`</p>
			</div>
		`;
		document.getElementById("photo-list").innerHTML = document.getElementById("photo-list").innerHTML + child;
	});
</script>