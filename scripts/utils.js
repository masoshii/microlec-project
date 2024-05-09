function isEmailValid(emailString){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|cl|ar|co|uy|uk|pe|br|bo)$/;

    return emailRegex.test(emailString);
}

function cookieProcess(cookieValue){
  
    var actualChar;
    var productID = "";
    var productQuantity = "";
    var fetchingID = true;
    var products = new Map();
  
    for (let i = 0; i < cookieValue.length; i++) {
      actualChar = cookieValue.charAt(i);
      if(actualChar == '%'){
        fetchingID = false;
      } else if (actualChar == '&'){
        products.set(productID,productQuantity);
        productID = "";
        productQuantity = "";
        fetchingID = true;
      } else if (isNumeric(actualChar)) {
        if (fetchingID){
          productID += actualChar;
        } else {
          productQuantity += actualChar; 
        };
      };
    }
    return products;
}


function productsInCookie(cookieValue){
    var actualChar;
    var fetchingID = true;
    var quantity = 0;
  
    for (let i = 0; i < cookieValue.length; i++) {
      actualChar = cookieValue.charAt(i);
      if(actualChar == '%'){
        quantity += 1;
        fetchingID = false;
      } else if (actualChar == '&'){
        fetchingID = true;
    }
  }
  return quantity;
}
  
function readCookie(name)
{
name += '=';
var parts = document.cookie.split(/;\s*/);
for (var i = 0; i < parts.length; i++)
{
    var part = parts[i];
    if (part.indexOf(name) == 0)
    return part.substring(name.length)
}
return null;
}
  
function isNumeric(str) {
if (typeof str != "string") return false
return !isNaN(str) && !isNaN(parseFloat(str))
}

function deleteProductCookie(cookieValue, idToRemove) {
  var regex = new RegExp(`${idToRemove}%\\d+&`, 'g');
  
  var updatedCookieValue = cookieValue.replace(regex, '');
  
  if (updatedCookieValue.charAt(updatedCookieValue.length - 1) !== '&') {
    updatedCookieValue = updatedCookieValue.slice(0, -1) + '&';
  }
  
  document.cookie = `cart_items=${updatedCookieValue}; expires=Fri, 31 Dec 2100 12:00:00 UTC; path=/`
}