---
layout: default
---

<div id="hero" style="height: 70vh;border-bottom: 1px solid #eee;filter: saturate(1.2); text-align: center;"><h1 style="font-size: 100px;margin: 0;padding-top: 40%;padding-top: calc(35vh - 75px);">๐<span style="font-size: 90px;">๐งก</span>๐</h1></div>

# Things I <span id="046b759f57ebf5d19440f0639ddd41b7">Love</span>

- DeFi - own your own funds ~~and mistakes~~
- [Music](https://twitter.com/search?q=(%23AppleMusic)%20(from%3ABeriru_Chan)%20filter%3Alinks%20-filter%3Areplies&src=typed_query&f=live){:target="_blank" rel="noopener"}: \
`EDM || lofi || instrumental || music.other.filter(hasNiceBeats)`
- Drinks:
	- Ice oatmeal latte (or any other regular coffee)
	- Any random liquors \
`๐ธ > ๐ฅ == ๐พ > ๐ท >= ๐ฅ == ๐น > ๐ป`\
`๐ฅ === wine.white` [?](https://www.foodandwine.com/news/white-wine-emoji-unicode-approval-fail){:target="_blank" rel="noopener"}
- Food:
	- Any random Japanese dishes \
`๐ || ๐ฃ || ๐ค || pickRandom(food.jp)`
	- Any random Italian dishes \
`๐ || ๐ || ๐ฅ || pickRandom(food.it)`
	- A good dry-aged steak
- Cruising ๐ข
- ~~Travel~~ Stay at nice resorts
- [Kigurumi](https://beriru.wiki/photos/?loadSingle=96) - both dollmask, animegao and fursuit. My collection [โ](kig-list/)
- Nicely textured fabrics <span class="hidden-text">on nicely shaped bodies, e.g. zentai, [tights](https://beriru.wiki/photos/?loadSingle=54&hidden=yes), [knee-socks](https://beriru.wiki/photos/?loadSingle=69)</span>
- `๐ฏ๐ต[๐ฑ, โฉ๏ธ, ๐ป, ๐, jp.others]`
- Hatsune Miku

# Tools I Like

- Hardware
	- The usual Apple stuff (MacBook Pro, iPhone, iPad)
	- [Keychron](https://www.keychron.com/){:target="_blank" rel="noopener"} K2, K12
	- Dyson Supersonic & Digital Slim
- Software
	- [Surge](https://nssurge.com){:target="_blank" rel="noopener"}
	- [frp](https://github.com/fatedier/frp){:target="_blank" rel="noopener"}
	- [CleanShotX](https://cleanshot.com){:target="_blank" rel="noopener"}
	- [MenubarX](https://menubarx.app/){:target="_blank" rel="noopener"}
	- [OpenIn](https://loshadki.app/openin/){:target="_blank" rel="noopener"}
	- [Noir](https://getnoir.app){:target="_blank" rel="noopener"} (hence why this page doesn't have a dark theme)
- Creative
	- Fujifilm X Cameras
	- Adobe CC
	- FiLMiC Pro
- Web3 & DeFi
	- [Nansen Portfolio](https://portfolio.nansen.ai/){:target="_blank" rel="noopener"}
	- [Tenderly](https://tenderly.co){:target="_blank" rel="noopener"}
	- [SafePal S1](https://store.safepal.com/safepal-s1-hardware-wallet.html){:target="_blank" rel="noopener"}

# Photos I Took

<div style="text-align: center; font-size: 120%;"><a class="no-underline" href="/photos/?loadRandom=yes">View</a></div>
<div style="text-align: center">Embrace the randomness, enjoy the treasure hunting. Yet you may find some of them disturbing or weird. But that's none of my business.</div>

# Stuff I Made

<div style="text-align: center"><i>nothing worth putting here as of <span id="current"></span></i>
<script>
	// fill in the date
	var date = new Date();
	var current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate();
	document.getElementById("current").innerHTML = current_date;
</script>

<script>
	// easter egg
	var keki = '๐KEKI'
	window.addEventListener('keypress', (function() {
	    var strToType = 'keki',
	        strTyped = '';
	    return function(event) {
	        var character = String.fromCharCode(event.which);
	        strTyped += character;
	        if (strToType.indexOf(strTyped) === -1) strTyped = '';
	        else if (strTyped === strToType) {
	            strTyped = '';
	            alert(keki);
	        }
	    };
	}()) );
	document.getElementById("046b759f57ebf5d19440f0639ddd41b7").addEventListener('click', function() {alert(keki); });
</script>

<script>
	// put guide on hero after 5s
	const showInstruct = setTimeout(function(){document.getElementById("hero").insertAdjacentHTML('beforeend', `<p id="hero-instruct">โฌ๏ธ</p>`)}, 2000);

	// remove instruct
	var firstScrollDone = false;
	document.addEventListener("scroll", function(){
		if (firstScrollDone) {
			if (showInstruct) {
		  	clearTimeout(showInstruct);
		  };
		  if (document.getElementById("hero-instruct")) {
		  	document.getElementById("hero-instruct").remove();
		  }
		} else {
			firstScrollDone = true;
		}
	});

	// on scroll blur hero
	const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
	document.addEventListener("scroll", function(){
	  var currentPos = document.documentElement.scrollTop;
	  document.getElementById("hero").style.filter = "blur("+(currentPos/(vh/2)*50)+"px)";
	});
</script>
