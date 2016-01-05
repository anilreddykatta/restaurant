var Constants = require("../../constants");

var ResetPasswordEmailTemplate = function(){
	this.EmailTemplate = EmailTemplate;
};

/**
 * @return {string}
 */
function EmailTemplate(email, token) {
	return "<h1>"+ Constants.DEV_DOMAIN+"/#/changepassword/"+email+"/"+token;
}


module.exports = ResetPasswordEmailTemplate;
