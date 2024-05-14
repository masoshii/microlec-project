$(document).ready(function() {
    $(document).on('click', '#login-submit', function( e ){
        e.preventDefault;

        var isInvalid = false;
        var emailValue = $('#email-input').val();
        var pwdValue = $('#password-input').val();
        var repValue = $('#repeat-password-input').val()

        if (isBlank(emailValue)) {
            $('#weird-email').css('opacity', '0');
            $('#email-emsg').css('opacity', '1');
            $('#email-input').css('border-bottom', '1px solid red');
            isInvalid = true;
        }
        
        if(!isEmailValid(emailValue) && !isBlank(emailValue)){
            $('#email-emsg').css('opacity', '0');
            $('#weird-email').css('opacity', '1');
            $('#email-input').css('border-bottom', '1px solid red');
            isInvalid = true;
        }
        
        if(isBlank(pwdValue)){
            $('#password-emsg').css('opacity', '1');
            $('#password-input').css('border-bottom', '1px solid red');
            isInvalid = true;
        }

        if(isBlank(repValue) || pwdValue != repValue){
            $('#repeat-password-emsg').css('opacity', '1');
            $('#repeat-password-input').css('border-bottom', '1px solid red');
            isInvalid = true;
        }
        
        if(!isInvalid){
            $('#email-input').val('');
            $('#password-input').val('');
            location.reload();
        }
    });
    $(document).on('input', '.form-control', function(){
        var object = $(this);
        object.css("border-bottom", "1px solid rgb(32, 32, 32)");

        if (object.attr('id') == 'email-input'){
            $('#weird-email').css('opacity', '0');
            $('#email-emsg').css('opacity', '0');
        } else if (object.attr('id') == 'password-input') {
            $('#password-emsg').css('opacity', '0');
        } else {
            $('#repeat-password-emsg').css('opacity', '0');
        }
    })
});