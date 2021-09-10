$(document).ready(function(){
  $(window).on('scroll', topScroll);
  
  $(this).scrollTop(0);
});

function topScroll() {
  const buttonUp = $('.button-up');
    
  if (window.scrollY > 800) {
      buttonUp.removeClass('button-properties');
  } else {
      buttonUp.addClass('button-properties');
  }
};
