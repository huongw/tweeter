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

  const renderTweets = function(tweets) {
    for (const obj of tweets) {
      $('#tweets-container').append(createTweetElement(obj));
    }
  };

  const loadTweets = function() {
    $.ajax('/tweets', {method: 'GET'})
    .then(function(arr) {
      console.log("Success", arr);
      renderTweets(arr);
    })
  };

  loadTweets()

  $('form').submit(function(event) {
    event.preventDefault();
    const data = $(this).serialize()
    $.post('/tweets', data)
  })

})
