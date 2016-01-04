var Constants = require("../../constants");

var ResetPasswordEmailTemplate = function(){

};

/**
 * @return {string}
 */
ResetPasswordEmailTemplate.prototype.EmailTemplate = function(email, token) {
	return "<h1>"+ Constants.DEV_DOMAIN+"/#/changepassword/"+email+"/"+token;
};


module.exports = new ResetPasswordEmailTemplate();