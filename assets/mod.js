// 
function makeHiddenTextReveal(){
  const hiddenTexts = document.getElementsByClassName('hidden-text');
  for (const hiddenText of hiddenTexts) {
    hiddenText.setAttribute("showHidden", "0");
    hiddenText.addEventListener('click', function onClick(event) {
      if (event.target.getAttribute("showHidden") == "0") {
        event.target.classList.remove = 'hidden-text';
        event.target.setAttribute("showHidden", "1");
      } else {
        event.target.classList.add = 'hidden-text';
        event.target.setAttribute("showHidden", "0");
      }
    });
  }
}
