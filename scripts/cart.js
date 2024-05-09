$(document).ready(function(){
  cookieProcess(readCookie("cart_items"))
  elementExistsValidation();
  $('.product-quantity-select').on('input', function() {
    var sanitized = $(this).val().replace(/[^0-9]/g, "1");
    $(this).val(sanitized);
  });
  $('.product-item-delete').click(function(event) {
    event.preventDefault();
    
    var productItem = $(this).closest('.product-item');
  
    var productId = "#" + productItem.attr('id');
  
    $(productId).nextAll(".product-sep").first().remove()
    $(productId).remove();
    
    elementExistsValidation();
  });
});

function elementExistsValidation(){
  var listItems = document.querySelectorAll('.product-item');
  var count = listItems.length;
  if (count == 0){
    document.getElementById("no-items").style.display = "flex";
  } else {
    document.getElementById("no-items").style.display = "none";
  }
}

