$(document).ready(function(){
  $(this).scrollTop(0);
});

window.addEventListener("load", function() {
  const buttonUp = document.querySelector('.button-up');

  window.addEventListener("scroll", topScroll);

  function topScroll() {
    if (window.scrollY > 800) {
      buttonUp.style.visibility = "visible"
      buttonUp.style.opacity = "1"
      buttonUp.style.pointerEvents = "initial"
    } else {
      buttonUp.style.visibility = "hidden";
      buttonUp.style.opacity = "0";
      buttonUp.style.pointerEvents = "initial"
    }
  }
})
