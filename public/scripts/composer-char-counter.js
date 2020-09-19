
$(document).ready(function() {
  let textareaValue = $("textarea").val();
  $("textarea").on("change keyup paste", function() {
    let currentVal = $(this).val();
    if (currentVal === textareaValue) {
      return; 
    }
    let Count = 140 - currentVal.length;
    if (Count < 0) {
      $("#counter").css('color', 'red');
    } else {
      $("#counter").css('color', 'inherit');
    }
    $("#counter").html(Count);
    textareaValue = currentVal;
  });
});
