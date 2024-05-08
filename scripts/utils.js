function isEmailValid(emailString){
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|cl|ar|co|uy|uk|pe|br|bo)$/;

    return emailRegex.test(emailString);
}