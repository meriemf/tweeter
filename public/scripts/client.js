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
 
    }
   
   // Test / driver code (temporary)
   const renderTweets = function(data) {
   // loops through tweets
   for(let item of data) {
     const $tweet = createTweetElement(item);
     $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
   }
   }
   createTweetElement = function(tweetData) {
     let $tweet = $(`<article class= "tweet">
     <header>
       <div><img src=${tweetData.user.avatars}></div>
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
             console.log(res);
            renderTweets(res.reverse());
             })
            //.then($("#tweet-text").val(""));
   }

   loadtweets();  
   //const safeHTML = `<p>${escape(textFromUser)}</p>`;
 
   $("form").submit(function(event) {
      $('#error-no-content').hide();
      $('#error-content-too-long').hide();
      event.preventDefault(); //prevent default action 
      let post_url = $(this).attr("action"); //get form action url
      let request_method = $(this).attr("method"); //get form GET/POST method
      let form_data = $(this).serialize(); //Encode form elements for submission
      let res = ($('#tweet-text').val());
      if(!res) {
        $('#error-no-content').show();
      } else if (res.length > 140) {
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
})
  
 