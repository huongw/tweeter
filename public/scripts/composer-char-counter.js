$(document).ready(function() {
  $("#tweet-text").on("input", function() {
    const textLength = this.textLength;
    const $counter = $(this).parent().siblings(".button-wrapper").children(".counter");
    const counterMaxLength = 140;
    $counter.val(counterMaxLength - textLength);
    if ($counter.val() < 0){
      $counter.css("color", "red");
    }
  })
});