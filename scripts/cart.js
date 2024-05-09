$(document).ready(function(){
  $('.product-quantity-select').on('input', function() {
    var sanitized = $(this).val().replace(/[^0-9]/g, "1");
    $(this).val(sanitized);
  });
});

function deleteFromCar() {
  
}