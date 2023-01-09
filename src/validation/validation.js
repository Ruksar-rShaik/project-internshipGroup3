const isValidateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)
    
};

const isValidateName = function(name){
    const regex = /^([a-z  A-Z ]){2,30}$/
    return regex.test(name)
} 

const isValidPhone = function(phonenumber){
    const regex = /^[1-9]\d*$/
    return regex.test(phonenumber)
}


module.exports.isValidateEmail = isValidateEmail
module.exports.isValidateName = isValidateName
module.exports.isValidPhone = isValidPhone