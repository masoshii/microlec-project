function isEmailValid(emailString){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|info|io|app|blog|guru|tech|agency|cl|ar|co|uy|uk|pe|br|bo)$/;

    return emailRegex.test(emailString);
}