$(document).ready(function(){
    document.cookie = "cart_items=; expires=Fri, 31 Dec 2100 12:00:00 UTC; path=/";
    refreshButton();
    $(document).on('click', '.cart-button', function() {
        var cartItem = $(this).closest('.product-more');
        var cartItemId = cartItem.attr('id');
        var FFormatPid = cartItemId.replace('prod-', '');
        var SFormatPid = FFormatPid.replace('-more', '');
        if (SFormatPid == '001'){
          addProductToCookie(readCookie("cart_items"), SFormatPid, 10);
        } else {
          addProductToCookie(readCookie("cart_items"), SFormatPid, 1);
        }
    });
});

function refreshButton(){
    $('.product-more').each(function() {
      var thisId = $(this).attr('id');
      var FFormatPid = thisId.replace('prod-','');
      var SFormatPid = FFormatPid.replace('-more', '');
      var cartButton = $("#" + thisId).find(".btn-col button");
      if (productIsInCookie(readCookie("cart_items"), SFormatPid)){
        cartButton.attr('class', 'cart-button exists');
        cartButton.prop('disabled', true);
      } else {
        cartButton.attr('class', 'cart-button');
        cartButton.prop('disabled', false);
      }
    });
  }
  