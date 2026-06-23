---
layout: front
---

<div id="hero" style="height: 70vh;border-bottom: 1px solid #eee;filter: saturate(1.2); text-align: center; display: none;"><h1 style="font-size: 100px;margin: 0;padding-top: 40%;padding-top: calc(35vh - 75px);">💎<span style="font-size: 90px;">🧡</span>🎂</h1></div>

# Things I <span id="046b759f57ebf5d19440f0639ddd41b7">Love</span>

- DeFi
- Lo-Fi-Beats
- Chillstep
- Lounge
- Full Ice Quad Americano
- Brut Champagne
- Draft Asahi
- Dry Vodka Martini
- GNT
- 明太子つけめん麺
- Any Cold Cuts
- Cruising
- Staycation
- Lounges
- [着ぐるみ](kig-list/)
- 全身タイツ
- 絶対領域
- 涼宮ハルヒ
- Hatsune Miku
- W205 C63 coupe
- X100s

# Tools I Adore

- M series MacBook Pro
- Keychron Q9
- Dyson Supersonic
- [Surge](https://nssurge.com){:target="_blank" rel="noopener"}
- CleanShotX
- MenubarX
- OpenIn
- ProCCD
- GFX100s
- Lr CC and Creative Cloud
- [Tenderly](https://tenderly.co){:target="_blank" rel="noopener"}

# Photos I Took

<div style="text-align: center; font-size: 120%;"><a class="no-underline" href="/photos/?loadRandom=yes">I'm Feeling Lucky</a></div>

# Legacy I Built

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
