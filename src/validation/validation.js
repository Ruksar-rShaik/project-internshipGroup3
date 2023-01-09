const isValidateEmail = function(email) {
    const re = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
    return re.test(email)
    
};

const isValidateName = function(name){
    const regex = /^([a-z  A-Z ]){2,30}$/
    return regex.test(name)
} 



module.exports.isValidateEmail = isValidateEmail
module.exports.isValidateName = isValidateName