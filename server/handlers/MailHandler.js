var NodeMailer = require('nodemailer')
	,CONSTANTS = require('../../constants')
	,RegisterEmailTemplate = require('../emailtemplates/registeremailtemplate')
	,ResetEmailTemplate = require('../emailtemplates/resetpasswordemailtemplate');

var Transporter = NodeMailer.createTransport({
	service: 'Gmail',
	auth: {
		user: CONSTANTS.GMAIL_SMTP.GMAIL_SMTP_EMAIL_ID,
		pass: CONSTANTS.GMAIL_SMTP.GMAIL_SMTP_PASSWORD
	}
});

var RegisterMailOptions = {
	from : 'AllKarte Registration Confirmation<allkarte@gmail.com>',
	subject : 'Registration Confirmation'
};

var ResetPasswordMailOptions = {
	from : 'AllKarte Reset Password Confirmation<allkarte@gmail.com>',
	subject : 'Reset Password Token'
};

function SendRegisterMail(emailAddress, isHost) {
	RegisterMailOptions['to'] = emailAddress;
	var RegistrationsMailTemplates = new RegisterEmailTemplate();
	if(isHost) {
		RegisterMailOptions['html'] = RegistrationsMailTemplates.HostEmailTemplate();
	} else {
		RegisterMailOptions['html'] = RegistrationsMailTemplates.UserEmailTemplate();
	}

	//Sending Email After Registration
	Transporter.sendMail(RegisterMailOptions, function(error, info){
		if(error){
			return console.log(error);
		}
		console.log('Registration success Email Sent: '+info.response);
	});
}

function SendResetPasswordToken(user) {
	var ResetMailTemplate = new ResetEmailTemplate();
	ResetPasswordMailOptions['to'] = user.email;
	ResetPasswordMailOptions['html'] = ResetMailTemplate.EmailTemplate(user.email, user.reset_token);
	Transporter.sendMail(ResetPasswordMailOptions, function(error, info){
		if(error) {
			return console.log(error);
		}
		console.log('Email Sent'+info.response);
	});
}

var MailHandler = function() {
	this.SendRegisterMail = SendRegisterMail;
	this.SendResetPasswordToken = SendResetPasswordToken;
};

module.exports = MailHandler;
