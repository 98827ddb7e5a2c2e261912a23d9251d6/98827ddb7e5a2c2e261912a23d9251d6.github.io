// hidden text reveal
function hasClass(ele, cls) {
    return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}

function addClass(ele, cls) {
    if (!hasClass(ele, cls))
        ele.className += " " + cls;
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        ele.className = ele.className.replace(reg, ' ');
    }
}

function makeHiddenTextReveal(){
  const hiddenTexts = document.getElementsByClassName('hidden-text');
  for (const hiddenText of hiddenTexts) {
    hiddenText.setAttribute("showHidden", "0");
    hiddenText.addEventListener('click', function onClick(event) {
      if (event.target.getAttribute("showHidden") == "0") {
        removeClass(event.target, 'hidden-text');
        event.target.setAttribute("showHidden", "1");
      } else {
        addClass(event.target, 'hidden-text');
        event.target.setAttribute("showHidden", "0");
      }
    });
  }
}
