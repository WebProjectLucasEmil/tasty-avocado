const MIN_EMAIL_LENGTH = 6
const MAX_EMAIL_LENGTH = 30




exports.validateEmail = function(account){
    const errors = []
    var mailformat = "/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/";
    if (accoun.email.match(mailformat)) {
        alert("Valid email address!");
        return true;
    }
    else {
        errors.push("You have entered an invalid email address!");
        return errors;
    }
}


