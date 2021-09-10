$(document).ready(function() {

  $('.write-tweet').click(() => {
    $('.new-tweet').toggle("slow", () => {
      $('.error-msgs').hide();
    });
    });

  // Form submit
  $('form').on("submit", onSubmit);

  loadTweets(); // Initially Renders Tweets
})

const onSubmit = function(event) {
  event.preventDefault();

  const $form = $(this);

  let text = $form.find('#tweet-text').val();
  const $counter = $form.find('.counter');

  // Error Messages
  if (text === "") {
    return $(".error-msgs").text("Post cannot be empty!").slideDown().show();
  }

  if ($counter.val() < 0) {
    return $(".error-msgs").text("Post cannot exceed over 140 character limit!").slideDown().show();
  }

  // Post /tweets
  const data = $form.serialize();
  $.post('/tweets', data)
  .then(function() {
    $('#tweet-text').val(''); // Refresh Value
    $(".error-msgs").hide(); // Hide Error Msgs
    $($counter).val(140); // Restarts counter
    loadTweets(); // Instantly Loads Tweet To Page
  });
};

  // Creates HTML For Tweet Post
  const createTweetElement = function(tweet) {
    let $tweet = `
    <article class="tweet">
    <header>
      <div class="name-wrapper">
        <img src="${tweet.user.avatars}">
        <span>${tweet.user.name}</span>
      </div>
      <div>
        <span><a class="user-handle" href="#">${tweet.user.handle}</a></span>
      </div>
    </header>
    <div class="tweet-post">
      <p>${escape(tweet.content.text)}</p>
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

  // Appends Tweets into #tweet-container
  const renderTweets = function(tweets) {
    // Refresh Value When Page Reloads
    $('#tweet-text').val('');

    // Clear #tweets-container before appending
    $('#tweets-container').empty();

    for (const obj of tweets) {

      $('#tweets-container').prepend(createTweetElement(obj));
    }
  };

  // Get /tweets
  const loadTweets = function() {
    $.get('/tweets', {method: 'GET'})
    .then(function(arr) {
      renderTweets(arr);
    })
  };