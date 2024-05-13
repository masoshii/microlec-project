$(document).ready(function(){
    $(document).on('input', '#search-form-input', function(){
        $('#search-form-input').css('border', 'none');
    })
})


let isOpen = false;


function sManager(){
    if (!isOpen) {
        sOpen();
        changeIcon(true);
        darkenScreen(true);
        isOpen = true;
    } else {
        sClose();
        changeIcon(false);
        darkenScreen(false);
        isOpen = false;
    }
}

function sOpen() {
    document.getElementById("sidebar-list-mobile").style.display = "block";
    document.getElementById("sidebar-list-mobile").style.width = "45%";
    document.getElementById("sidebar-items").style.display = "block";
}

function sClose() {
    document.getElementById("sidebar-list-mobile").style.width = "0";
    document.getElementById("sidebar-list-mobile").style.display = "none";
    document.getElementById("sidebar-items").style.display = "none";
}

function darkenScreen(isActive){
    if (isActive){
        document.getElementById("darken-bg").style.display = "block";
    } else {
        document.getElementById("darken-bg").style.display = "none";
    }
}

function changeIcon(openned){
    if (openned) {
        jQuery(function($){
            $('.bi-list').addClass('bi-x-lg').removeClass('bi-list');
        });
    } else {
        jQuery(function($){
            $('.bi-x-lg').addClass('bi-list').removeClass('bi-x-lg');
        });
    }
}

function closeOnClick(){
    sClose();
    changeIcon(false);
    darkenScreen(false);
    isOpen = false;
}

(function() {
    'use strict';
    window.addEventListener('load', function() {
      var forms = document.getElementsByClassName('needs-validation');
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            document.getElementById('search-form-input').style.border = "1px solid red";
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
  })();
