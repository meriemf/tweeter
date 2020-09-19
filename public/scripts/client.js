$(document).ready(()=>{ 

  const escape =  function(str) {
    
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  
  }

  function showDays(time){
 
     const endDay = Date.now();
     const millisecondsPerDay = 1000 * 60 * 60 * 24;
     const millisBetween = endDay - time;
     const days = millisBetween / millisecondsPerDay;
     return( Math.floor(days));
 
  };
  
  // loops through tweets

  const renderTweets = function(data) {
   for(let item of data) {
     const $tweet = createTweetElement(item);
     $('#tweet-container').append($tweet); 
   }
  }
  
  createTweetElement = function(tweetData) {
     let $tweet = $(`
     <article class= "tweet">
      <header>
        <div class="avatar"><img src=${tweetData.user.avatars}></div>
        <div><p> ${tweetData.user.name}</p></div>
        <a href="#">${tweetData.user.handle}</a>
      </header>
      <textarea name="text">${escape(tweetData.content.text)}</textarea>
      <footer>
        <span id= 'creation-date'>${showDays(tweetData.created_at)} Days ago</span>
        <span id= 'like-button'> &#127988	&#8633 &#9829 </span>
      </footer>
     </article>
     `);
    return $tweet;
   
  }
 
  loadtweets = function() {
    $.ajax('http://localhost:8080/tweets/', { method: 'GET'})
    .then(function (res) {
    renderTweets(res.reverse());
    })
  }

  loadtweets();  
 
  $("form").submit(function(event) {
    
    $('#error-no-content').hide();
    $('#error-content-too-long').hide();
    //prevent default action 
    event.preventDefault(); 
    //get form action url
    let post_url = $(this).attr("action"); 
    //get form GET/POST method
    let request_method = $(this).attr("method"); 
    //Encode form elements for submission
    let form_data = $(this).serialize(); 
    let tweet = ($('#tweet-text').val());
    if(!tweet) {
      $('#error-no-content').show();
    } else if (tweet.length > 140) {
      $('#error-content-too-long').show();
    } else {
      $.ajax({
        url : post_url,
        type: request_method,
        data : form_data,
      }).done(function() { 
        $(loadtweets);
        $('#tweet-container').empty(); 
        $("#tweet-text").val("");
        $("#counter").val(140)
      });
    }
        
  });
  
  $(".newTweet-btn").click(function(evt){
    console.log("test");
    evt.preventDefault();
    $("textarea#tweet-text").focus();
  })  

});
