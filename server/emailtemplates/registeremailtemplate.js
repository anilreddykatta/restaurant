var RegisterEmailTemplate = function() {
	this.HostEmailTemplate = HostEmailTemplate;
	this.UserEmailTemplate = UserEmailTemplate;
};

function HostEmailTemplate() {
	return "<h1>Thanks for Hosting </h1>";
}

function UserEmailTemplate() {
	return "<h1>Thanks for User</h1>";
}

module.exports = RegisterEmailTemplate;
