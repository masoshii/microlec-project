function isEmailValid(emailString){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|cl|ar|co|uy|uk|pe|br|bo)$/;

    return emailRegex.test(emailString);
}

function cookieProcess(cookie_value){
  
    var actualChar;
    var productID = "";
    var productQuantity = "";
    var fetchingID = true;
    var products = new Map();
  
    for (let i = 0; i < cookie_value.length; i++) {
      actualChar = cookie_value.charAt(i);
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
    for (let [key, value] of products) {
        // Mostrar el nombre de la clave y su valor en un alert
        alert(`Producto: ${key}, Cantidad: ${value}`);
      }
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