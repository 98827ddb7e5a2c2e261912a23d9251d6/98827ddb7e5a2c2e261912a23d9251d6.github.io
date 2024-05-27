---
layout: default
---

<div id="hero" style="height: 70vh;border-bottom: 1px solid #eee;filter: saturate(1.2); text-align: center; display: none;"><h1 style="font-size: 100px;margin: 0;padding-top: 40%;padding-top: calc(35vh - 75px);">💎<span style="font-size: 90px;">🧡</span>🎂</h1></div>

# Things I <span id="046b759f57ebf5d19440f0639ddd41b7">Love</span>

- DeFi - own your ~~mistakes~~ assets
- Music: \
`ambient || chillhop || minimal tech || random(music).filter(niceHightlights || niceBeats)`\
The collection (only if you have Twitter logged in) [⋙](https://twitter.com/search?q=(%23AppleMusic%20OR%20%23YouTubeMusic%20OR%20%40YouTubeMusic%20OR%20%23Spotify)%20(from%3ABeriru_Chan)%20filter%3Alinks%20-filter%3Areplies&src=typed_query&f=live){:target="_blank" rel="noopener"}
- Drinks:
	- Full ice quad americano
	- Any random liquors \
`🍸 > 🍾 == 🍷 > 🥂 >= 🥃 == 🍻 > 🍹`\
`🥂 === wine.white` [?](https://www.foodandwine.com/news/white-wine-emoji-unicode-approval-fail){:target="_blank" rel="noopener"}
- Food:
	- `🍜 || 🍣 || 🍤 || random(jp.food)`
	- `🍝 || 🍕 || 🥗 || random(it.food)`
- Cruising 🚢
- ~~Traveling~~ Staycations
- [Kigurumi](https://beriru.wiki/photos/?loadSingle=96) - both dollmask, animegao ~~and fursuit~~. The collection [⋙](kig-list/)
- Interesting fabrics <span class="hidden-text">, e.g. zentai, [tights](https://beriru.wiki/photos/?loadSingle=54&hidden=yes), [knee-socks](https://beriru.wiki/photos/?loadSingle=69)</span>
- `🇯🇵[🍱, ⛩️, 🗻, 👘, random(jp)]`
- Performance Drives
	- ▶️ W205 C63 coupe (After facelift but without GPF)
	- ⏭️ X247 GLB35
- [Hatsune Miku](https://beriru.wiki/photos/?loadSingle=34)

# Tools I Like

- Hardware
	- The usual Apple suite
	- [Keychron](https://www.keychron.com/){:target="_blank" rel="noopener"} K2, K12
	- Dyson Supersonic & Digital Slim
- Software
	- [Surge](https://nssurge.com){:target="_blank" rel="noopener"}
	- [CleanShotX](https://cleanshot.com){:target="_blank" rel="noopener"}
	- [MenubarX](https://menubarx.app/){:target="_blank" rel="noopener"}
	- [OpenIn](https://loshadki.app/openin/){:target="_blank" rel="noopener"}
	- [Noir](https://getnoir.app){:target="_blank" rel="noopener"} (hence why this page doesn't have a dark theme)
- Creative
	- Fujifilm X100 & GFX Cameras
	- The usual Adobe suite
	- [Blackmagic Camera for iOS](https://apps.apple.com/us/app/blackmagic-camera/id6449580241)
- Web3 & DeFi
	- [Tenderly](https://tenderly.co){:target="_blank" rel="noopener"}
	- [Nansen Portfolio](https://portfolio.nansen.ai/){:target="_blank" rel="noopener"}
	- [SafePal S1](https://store.safepal.com/safepal-s1-hardware-wallet.html){:target="_blank" rel="noopener"}

# Photos I Took

<div style="text-align: center; font-size: 120%;"><a class="no-underline" href="/photos/?loadRandom=yes">View</a></div>
<div style="text-align: center">Embrace the randomness, enjoy the treasure hunting. It's not for everyone. You have been warned.</div>

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
	var keki = '💕KEKI'
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
	const showInstruct = setTimeout(function(){document.getElementById("hero").insertAdjacentHTML('beforeend', `<p id="hero-instruct">⬇️</p>`)}, 2000);

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
