$(document).ready(function (){
    $(document).on('click', '#submit-btn', function( e ){
        e.preventDefault();
        
        var isInvalid = false;
        var nameValue = $('#name-input').val();
        var lnameValue = $('#lname-input').val();
        var emailValue = $('#email-input').val();
        var commValue = $('#comments-input').val();

        if (isBlank(nameValue)) {
            $('#name-emsg').css("opacity", "1");
            $('#name-input').css("border", "1px solid red");
            isInvalid = true;
        }

        if (isBlank(lnameValue)){
            $('#lname-emsg').css("opacity", "1");
            $('#lname-input').css("border", "1px solid red");
            isInvalid = true;
        }

        if(isBlank(emailValue)){
            $('#weird-email').css("opacity", "0");
            $('#email-emsg').css("opacity", "1");
            $('#email-input').css("border", "1px solid red");
            isInvalid = true;
        }
        
        if(!isEmailValid(emailValue) && !isBlank(emailValue)) {
            $('#email-emsg').css("opacity", "0");
            $('#weird-email').css("opacity", "1");
            $('#email-input').css("border", "1px solid red");
            isInvalid = true;
        }

        if(isBlank(commValue)){
            $("#comments-emsg").css("opacity", "1");
            $('#comments-input').css("border", "1px solid red");
            isInvalid = true;
        }

        if (!isInvalid) {
            $('.modal-body').html(`Estimado/a <b>${capitalize(nameValue)}</b> <b>${capitalize(lnameValue)}</b>, una vez que presione enviar se le contactará brevemente vía correo electrónico. Esta acción es irreversible.`);
            $('#send-confirmation-modal').modal('show');
        }
        
        isInvalid = false;
    })    
    $(document).on('click', '.btn-close', function(){
        $('#send-confirmation-modal').modal('hide');
    })

    $(document).on('click', '#cancel-btn', function(){
        $('#send-confirmation-modal').modal('hide');
    })

    $(document).on('click', '#confirm-btn', function(){
        location.reload();
    })

    $(document).on('input', '.form-control', function(){
        var object = $(this);
        object.css("border", "none");
        object.nextAll('.error-msg').first().css('opacity', '0');

        if (object.attr('id') == 'email-input'){
            $('#weird-email').css('opacity', '0');
        }
    })
})
