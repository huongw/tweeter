const createTweetElement = function(tweet) {
  let $tweet = `
  <article class="tweet">
  <header>
    <div class="name-wrapper">
      <img src="${tweet.user.avatars}">
      <span>${tweet.user.name}</span>
    </div>
    <div>
      <span><a href="#">${tweet.user.handle}</a></span>
    </div>
  </header>
  <div class="tweet-post">
    <p>${tweet.content.text}</p>
  </div>
  <footer>
    <span>
      ${timeago.format(tweet["created_at"])}
    </span>
    <span class="icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </span>
  </footer>
</article>
`
return $tweet;
};

$(document).ready(function() {
  $('#tweet-text').val('');

  const renderTweets = function(tweets) {
    for (const obj of tweets) {
      $('#tweets-container').prepend(createTweetElement(obj));
    }
  };

  const loadTweets = function() {
    $.get('/tweets', {method: 'GET'})
    .then(function(arr) {
      console.log("Success", arr);
      renderTweets(arr);
    })
  };

  $('form').submit(function(event) {
    event.preventDefault();

    let $inputField = $(this).children('.wrapper').children('#tweet-text').val();
    const $counter = $(this).children('.button-wrapper').children('.counter');

    if ($inputField === "") {
      return $(".error-msgs").text("Post cannot be empty!").slideDown().show();
    }

    if ($counter.val() < 0) {
      return $(".error-msgs").text("Post cannot exceed over 140 character limit!").slideDown().show();
    }

    const data = $(this).serialize()
    $.post('/tweets', data)
    .then(function() {
      $('#tweet-text').val('');
      $(".error-msgs").hide();
      loadTweets();
    })

  });

  loadTweets();
})
