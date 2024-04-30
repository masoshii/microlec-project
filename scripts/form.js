window.onload = function(){
    $( "#contact-form" ).submit(function( event ) {
        var name = $('#nameid').val();
        var lasts = $('#lnameid').val();
        alert('El usuario ' + name + ' ' + lasts + ' ha sido registrado correctamente.');
    });
};