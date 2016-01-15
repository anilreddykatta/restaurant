var User = require('../models/user')
	,MailHandler = require('./MailHandler')
	,Allakarte = require('./../models/allakarte');

var AuthHandler = function() {
	this.GoogleSignIn = googleSignIn;
	this.GoogleSignInCallback = googleSignInCallback;
	this.FacebookSignIn = facebookSignIn;
	this.FacebookSignInCallback = facebookSignInCallback;
	this.LocalSignIn = localSignIn;
	this.LocalSignInCallback = localSignInCallback;
	this.RegisterLocal = registerLocal;
	this.ResetPassword = ResetPassword;
	this.ResetPasswordCallback = ResetPasswordCallback;
	this.SignOut = SignOut;
	this.LocalSignInWithSocial = LocalSignInWithSocial;
	this.LoginWithToken  = LoginWithToken;
};

function googleSignIn(req, res, next) {
	passport = req._passport.instance;
	passport.authenticate('google', {scope: 'https://www.googleapis.com/auth/userinfo.email'}, function(err, user, info) {
	})(req,res,next);
}

function googleSignInCallback(req, res, next) {
	console.log(req.toString());
	if(req.user) {
		return res.redirect('/#/login?token=' + req.user.token.token + '&user=' + req.user.email);
	} else {
		return res.redirect('/#/login');
	}
}

function facebookSignIn(req, res, next) {
	res.send('Facebook Login Successful');
}

function facebookSignInCallback(req, res, next) {
	console.log(req.toString());
	if(req.user) {
		return res.redirect('/#/login?token=' + req.user.token.token + '&user=' + req.user.email);
	} else {
		return res.redirect('/#/login');
	}
}

function localSignIn(req, res, next) {
	if (req.user) {
		User.createToken(req.user.email, function(err, user) {
			if (err) {
				res.json({success: false, message: 'Issue generating token'});
			} else {
				res.send({'success': true, user : {token: user.token, user_id: user.user_id, username: user.email}});
			}
		});
	} else {
		res.json({success: false, message: 'AuthError'});
	}
}

function LocalSignInWithSocial(req, res, next) {
	if(req.body.token && req.body.username) {
		User.findUser(req.body.username, req.body.token, function(err, user){
			if(err) {
				res.json({success: false, message: 'AuthError'});
			} else {
				req.user = user;
				res.send({'success': true, user : {token: user.token, user_id: user.user_id, username: user.email}});
			}
		});
	} else {
		res.json({success: false, message: 'AuthError'});
	}
}

function LoginWithToken(req, res, next) {
	if(req.params.user_id && req.body.token) {
		User.FindByUserIdAndToken(req.params.user_id, req.body.token, function(err, user){
			if(err || !user) {
				res.status(403);
				res.send({'success': false, 'error': err});
			} else {
				res.send({'success': true, user : {token: user.token, user_id: user.user_id, username: user.email}});
			}
		});
	} else {
		res.status(403);
		res.send({'success': false, message: 'AuthError'});
	}
}

function registerLocal(req, res, next) {
	console.log("Registering User");
	console.log(req.body);
	User.register(
		new User({
			username: req.body.email,
			email:req.body.email,
			firstname: req.body.firstname,
			lastname: req.body.lastname,
			city: req.body.city,
			role: 'guest'
		}), req.body.password, function(err){
			if(err) {
				console.log(err);
				console.log("Error Registering User");
				res.send("Not able to register user");
			}
			MailHandler.SendRegisterMail(req.body.email,true);
			res.send({'success': true});
		}
	);
}

function localSignInCallback(req, res, next) {}

function ResetPassword(req, res, next) {
	User.generateResetToken(req.body.email, function(err, user){
		MailHandler.SendResetPasswordToken(user);
	});
}

function ResetPasswordCallback(req, res, next) {
	User.findUserByResetToken(req.body.email, req.body.access_token, function(err, user){
		res.send(user);
	});
}

function SignOut(req, res, next) {
	console.log(req.body);
	if(req.user) {
		User.invalidateUserToken(req.body.email, function(err, user){
			console.log(req.body.email+ " successfully logged out");
		});
	}
}

module.exports = new AuthHandler();
