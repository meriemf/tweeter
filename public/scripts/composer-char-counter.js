i = 0;
$(document).ready(function(){
  $("textarea").keydown(function(key) {
    if (key.keyCode === 8) {
      i -=1;
      if (i >= 0) {
        $("#counter").text(140 - i);

      }
    }
   })
  $("textarea").keypress(function(){
    i += 1;
    if (i > 140) {
      $("#counter").css("color", "red");
    }
    $("#counter").text(140-i);
  });

  
});
