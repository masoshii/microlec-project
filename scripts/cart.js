$(document).ready(function(){
  showElementByCookie(cookieProcess(readCookie("cart_items")), productsInCookie(readCookie("cart_items")));
  updateHTMLQuantity(productsInCookie(readCookie("cart_items")));
  elementExistsValidation(productsInCookie(readCookie("cart_items")));
  refreshButton();
  $(document).on('input', '.product-quantity-select', function() {
    var sanitized = $(this).val().replace(/[^0-9]/g, "1");
    $(this).val(sanitized);
  });
  $(document).on('click', '.product-item-delete', function( e ) {
    e.preventDefault();
    var productItem = $(this).closest('.product-item');
    var productId = productItem.attr('id');
    var formatPid = productId.replace('prod-', '');

    var closestRow = productItem.nextAll('.product-sep').first();
    $(`#${productId}`).remove();
    closestRow.remove();

    deleteProductCookie(readCookie("cart_items"),formatPid);
    elementExistsValidation(productsInCookie(readCookie("cart_items")));
    updatePrices(cookieProcess(readCookie("cart_items")), productsInCookie(readCookie("cart_items")));
    updateHTMLQuantity(productsInCookie(readCookie("cart_items")));
    refreshButton();
    const cartButtons = $('.cart-button');
  });
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
    delay(2000);
    frontDelete();
    showElementByCookie(cookieProcess(readCookie("cart_items")), productsInCookie(readCookie("cart_items")));
    updateHTMLQuantity(productsInCookie(readCookie("cart_items")));
    elementExistsValidation(productsInCookie(readCookie("cart_items")));
  });
  $(document).on('focusout', '.product-quantity-select', function(){

    var cookieMap = cookieProcess(readCookie("cart_items"));
    var productId = $(this).closest('.product-item').attr('id');
    var FFormatPid = productId.replace('prod-','');
    var inputValue = $(this).val()
    var stepValue = parseInt($(this).attr('step'));

    if (isNumeric(inputValue)){
      inputValue = parseInt(inputValue);

      if (inputValue > 100){
        $(this).val(100);
        updateCookieQuantity(readCookie("cart_items"), FFormatPid, '100');
      } else if (inputValue <= 0 || inputValue < stepValue || !isMultiple(inputValue,stepValue)) {
        $(this).val(stepValue);
        updateCookieQuantity(readCookie("cart_items"), FFormatPid, stepValue);
      } else {
        updateCookieQuantity(readCookie("cart_items"), FFormatPid, inputValue);
      }
      
    } else {
      $(this).val(cookieMap.get(FFormatPid));
      updateCookieQuantity(readCookie("cart_items"), FFormatPid, cookieMap.get(FFormatPid));
    }
    updatePrices(cookieProcess(readCookie("cart_items")), productsInCookie(readCookie("cart_items")));
  });
  $(document).on('click', '#proceed-btn', function () {

    var productsQua = productsInCookie(readCookie("cart_items"));

    if (productsQua > 0 ){
      $('.modal-body').html(`Usted está a punto de comprar ${productsInCookie(readCookie("cart_items"))} producto(s), ¿Está seguro?`);
      $('#send-confirmation-modal').modal('show');
      $('#cancel-btn').css('display', 'block');
    } else {
      $('.modal-title').html('No hay productos');
      $('.modal-body').html(`¡Usted no tiene productos en su carro!`);
      $('#cancel-btn').css('display', 'none')
      $('#send-confirmation-modal').modal('show');
    }
  })


  $(document).on('click', '.btn-close', function(){
    $('#send-confirmation-modal').modal('hide');
  })

  $(document).on('click', '#cancel-btn', function(){
      $('#send-confirmation-modal').modal('hide');
  })

  $(document).on('click', '#confirm-btn', function(){
    if( productsInCookie(readCookie("cart_items")) > 0) {
      document.cookie = "cart_items=; expires=Fri, 31 Dec 2100 12:00:00 UTC; path=/";
      location.reload();
    } else {
      $('#send-confirmation-modal').modal('hide');
    }
  })
});


function elementExistsValidation(productsInCookie){
  if (productsInCookie == 0){
    document.getElementById("no-items").style.display = "flex";
  } else {
    document.getElementById("no-items").style.display = "none";
  }
}

function showElementByCookie(cookieMap, productQuantity){

  var productId;
  var productQua;
  var promises = [];

  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });


  for (let i = 0; i<productQuantity; i++){
    productId = Array.from(cookieMap.keys())[i];
    productQua = cookieMap.get(productId);

    promises.push(getProductById(productId));
  }

  Promise.all(promises).then(products => {
    products.forEach(product => {
      //Por cada producto hacer algo :)

      var savedQuantity = cookieMap.get(product.id);
      var moneyFormat = formatter.format(product.price); 

      var itemContainer = document.createElement('div');
      itemContainer.setAttribute('class', 'row product-item');
      itemContainer.setAttribute('id', `prod-${product.id}`);

      var itemSeparator = document.createElement('div');
      itemSeparator.setAttribute('class','row product-sep');
      itemSeparator.innerHTML = `<hr>`;

      var column1 = document.createElement('div');
      column1.setAttribute('class', 'col-md-2');
      column1.innerHTML = `
        <img src="resources/products/${product.image}" alt="Test Alt" class="product-item-image">
      `;
      itemContainer.appendChild(column1);

      var column2 = document.createElement('div');
      column2.setAttribute('class', 'col-md-5 align-self-end');
      column2.innerHTML = `
      <div class="row">
        <p class="product-item-brand">${product.brand}</p>
      </div>
      <div class="row">
        <p class="product-item-name">${product.name}</p>
      </div>
      <div class="row">
        <a class="product-item-delete" href="#" (click)="$event.preventDefault()">Eliminar del Carro</a>
      </div>
      `;
      itemContainer.appendChild(column2);

      var column3 = document.createElement('div');
      column3.setAttribute('class', 'col-md-2 align-self-center');
      column3.innerHTML = `
      <div class="row">
        <input type="number" class="product-quantity-select" min="${product.step}" max="100" value="${savedQuantity}" step="${product.step}">
      </div>
      `;
      itemContainer.appendChild(column3);

      var column4 = document.createElement('div');
      column4.setAttribute('class', 'col-md-3 align-self-center');
      column4.innerHTML = `
        <div class="row">
          <p style="font-size: 20px;" class="product-price">${moneyFormat}</p>
        </div>
      `;
      itemContainer.appendChild(column4);

      document.getElementById('product-list').appendChild(itemContainer);
      document.getElementById('product-list').appendChild(itemSeparator);

      updatePrices(cookieMap, productQuantity);

    });
  }).catch(error => {
    console.error('Error while fetching products: ' + error);
  })
}

function updatePrices(cookieMap, productQuantity){
  var promises = [];
  var totalMoney = 0;
  var shipMoney = 0;

  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  });

  if (productQuantity == 0){
    $('#product-qvalue').html(formatter.format(0));
    $('#tship-value').html(formatter.format(0));
    $('#tproduct-value').html(formatter.format(0));
    return;
  }
  for (let i = 0; i<productQuantity; i++){
    productId = Array.from(cookieMap.keys())[i];
    productQua = cookieMap.get(productId);

    promises.push(getProductById(productId));
  }

  Promise.all(promises).then(products => {
    products.forEach(product => {
      //Por cada producto hacer algo :)
      if (cookieMap.get(product.id) > 0){
        totalMoney += product.price * cookieMap.get(product.id);
        shipMoney += (Math.round(product.price * 0.05))*cookieMap.get(product.id);
      } else {
        totalMoney += product.price;
        shipMoney += product.price + 1220;
      }

      $('#product-qvalue').html(formatter.format(totalMoney));
      $('#tship-value').html(formatter.format(shipMoney));
      $('#tproduct-value').html(formatter.format(shipMoney+totalMoney));
    });
  }).catch(error => {
    console.error('Error while fetching products: ' + error);
  })
}


function getProductById(productID){
  var values = new Map();

  return new Promise((resolve, reject) => {
    fetch('https://api.npoint.io/b1835e64b763bdc81a30').then(response => response.json()).then(data => {
      for (const key in data) {
        if (data.hasOwnProperty(key) && key == productID) {
          const product = data[key];
          const values = {
            id: key,
            brand: product.brand,
            name: product.name,
            image: product.image,
            price: product.price,
            step: product.step
          };
          resolve(values);
          return;
        }
      }
      reject(new Error('Product not found.'));
    }).catch(function(error) {
      reject(new Error('Error while fetching products: ' + error));
    });
  })
}

function updateHTMLQuantity(productQuantity){
  if (productQuantity == 0){
    document.title = `Microlec | Carro`;
  } else {
    document.title = `Microlec | Carro (${productQuantity})`;
  }
  $("#product-qtitle").html(`Productos (${productQuantity}):`);
}

function frontDelete(){
  $('div.product-item').remove();
  $('div.product-sep').remove();
}

function refreshCartItems(){
  frontDelete();
  updateHTMLQuantity(productsInCookie(readCookie("cart_items")));
  elementExistsValidation(productsInCookie(readCookie("cart_items")));
}

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
