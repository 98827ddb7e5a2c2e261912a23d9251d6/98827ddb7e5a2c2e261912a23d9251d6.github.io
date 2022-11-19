// 
function makeHiddenTextReveal(){
  const hiddenTexts = document.getElementsByClassName('hidden-text');
  for (const hiddenText of hiddenTexts) {
    hiddenText.setAttribute("showHidden", "0");
    hiddenText.addEventListener('click', function onClick(event) {
      if (event.target.getAttribute("showHidden") == "0") {
        event.target.style.color = 'black';
        event.target.setAttribute("showHidden", "1");
      } else {
        event.target.style.color = 'rgba(120,120,120,0)';
        event.target.setAttribute("showHidden", "0");
      }
    });
  }
}
