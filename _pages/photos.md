---
layout: page
title: Photos I Love
permalink: /photos/
---

<script>
	// the list of images
	var imageList = 
	[
	  {
	    "url": "https://pbs.twimg.com/media/FfMi5v1UAAE1b1k?format=jpg&name=large",
	    "des": "黑曜。Hong Kong-Zhuhai-Macao Bridge in ZhuHai.",
	    "ref": "https://twitter.com/KEKI_1112/status/1581646304517984256",
	    "date": "2022-10-16 17:10:30"
	  },
	  {
	    "url": "https://pbs.twimg.com/media/FfqB3WCaUAAhxaC?format=jpg&name=large",
	    "des": "南烛。CM Viking Cruise, SZ<->XM.",
	    "ref": "https://twitter.com/KEKI_1112/status/1583721020800012288",
	    "date": "2022-08-21 12:33:18"
	  },
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
<p style="color: #fff;text-align: center;">I took most of them. All are <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank">CC BY-NC-SA 4.0</a> but you know I don't bother to sue you.</p>
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
		if (item.ref) {
			var refHtml = " <a href='"+refHtml+"' target='_blank'>></a>";
		} else {
			var refHtml = "";
		}
		var child = `
			<div class="photo-children">
				<img src="`+item.url+`"/>
				<p class="photo-des">`+item.des+refHtml+`</p>
				`+dateHtml+`
			</div>
		`;
		document.getElementById("photo-list").innerHTML = document.getElementById("photo-list").innerHTML + child;
	});
</script>