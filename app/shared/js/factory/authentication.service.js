(function () {
	'use strict';

	angular
	.module('Alacarte.food')
	.factory('AuthenticationService', AuthenticationService);

	AuthenticationService.$inject = ['$http', '$cookieStore', '$rootScope', '$timeout', 'UserService','$localStorage','$window'];
	function AuthenticationService($http, $cookieStore, $rootScope, $timeout, UserService,$localStorage,$window) {
		var service = {};

		service.Login = Login;
		service.SetCredentials = SetCredentials;
		service.ClearCredentials = ClearCredentials;
		service.LoginFacebook = LoginFacebook;
		service.LoginGoogle = LoginGoogle;
		service.getToken = getToken;
		service.saveToken = saveToken;
		service.isLoggedIn = isLoggedIn;
		service.getCurrentUser = getCurrentUser;
		service.ResetPassword = ResetPassword;
		service.SignOut = SignOut;
		service.changepassword = changepassword;
		service.LoginUsingToken = LoginUsingToken;
		//service.UserchangePassword = UserchangePassword

		$rootScope.globals = {
				currentUser: {}
		};
		return service;


		function getToken(){
			return $window.localStorage['alakarte-food'];
		}
		function saveToken(token){
			$window.localStorage['alakarte-food'] = token;
		}
		function isLoggedIn(){
			var token = service.getToken();
			//console.log(token);
			if (token) {
				// var payload = JSON.parse($window.atob(token.split('.')[1]));
				return true;
			} else {
				return false;
			}
		}
		function getCurrentUser(){
			if (service.isLoggedIn()) {
				var token = service.getToken();
				var payload = Base64.decode(token);
				return payload.substr(0, payload.indexOf(':'));
			}
		}

		function changepassword(email,token){
			$rootScope.resetuseremail = email;
			$rootScope.userresettoken = token;
		}

		function Login(username, password, callback) {
			UserService.GetByUserNameAndPassword(username, password)
			.then(function(response) {
				callback(response);
			});
		}

		function LoginUsingToken(username, token, callback) {
			this.saveToken(token);
			UserService.GetByUserNameAndToken(username, token)
				.then(function(response){
					callback(response);
				});
		}

		function  LoginFacebook(callback) {
			UserService.GetByFacebookLogin().then(function(response){
				callback(response);
			});
		}

		function LoginGoogle(callback) {
			UserService.GetByGoogleLogin().then(function(response){
				callback(response);
			});
		}

		function SetCredentials(username, password) {
			var authdata = Base64.encode(username + ':' + password);
			$rootScope.globals = {
					currentUser: {
						username: username,
						authdata: authdata,
						role: 'host'
					}
			};
			$http.defaults.headers.common['Authorization'] = 'Basic ' + authdata; // jshint ignore:line
			$window.localStorage['alakarte-food'] = authdata;
		}

		function ClearCredentials() {
			$rootScope.globals = {};
			$window.localStorage.removeItem('alakarte-food');
			$http.defaults.headers.common.Authorization = 'Basic';
		}

		function ResetPassword(username, callback){
			UserService.ResetPassword(username).then(function(response){
				callback(response);
			});
		}

		function SignOut(username, accessToken, callback) {
			UserService.SignOut(username, accessToken).then(function(response){
				callback(response);
			});
		}
	}




//	Base64 encoding service used by AuthenticationService
	var Base64 = {

			keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=',

			encode: function (input) {
				var output = "";
				var chr1, chr2, chr3 = "";
				var enc1, enc2, enc3, enc4 = "";
				var i = 0;

				do {
					chr1 = input.charCodeAt(i++);
					chr2 = input.charCodeAt(i++);
					chr3 = input.charCodeAt(i++);

					enc1 = chr1 >> 2;
					enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
					enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
					enc4 = chr3 & 63;

					if (isNaN(chr2)) {
						enc3 = enc4 = 64;
					} else if (isNaN(chr3)) {
						enc4 = 64;
					}

					output = output +
					this.keyStr.charAt(enc1) +
					this.keyStr.charAt(enc2) +
					this.keyStr.charAt(enc3) +
					this.keyStr.charAt(enc4);
					chr1 = chr2 = chr3 = "";
					enc1 = enc2 = enc3 = enc4 = "";
				} while (i < input.length);

				return output;
			},

			decode: function (input) {
				var output = "";
				var chr1, chr2, chr3 = "";
				var enc1, enc2, enc3, enc4 = "";
				var i = 0;

				// remove all characters that are not A-Z, a-z, 0-9, +, /, or =
				var base64test = /[^A-Za-z0-9\+\/\=]/g;
				if (base64test.exec(input)) {
					window.alert("There were invalid base64 characters in the input text.\n" +
							"Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
					"Expect errors in decoding.");
				}
				input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

				do {
					enc1 = this.keyStr.indexOf(input.charAt(i++));
					enc2 = this.keyStr.indexOf(input.charAt(i++));
					enc3 = this.keyStr.indexOf(input.charAt(i++));
					enc4 = this.keyStr.indexOf(input.charAt(i++));

					chr1 = (enc1 << 2) | (enc2 >> 4);
					chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
					chr3 = ((enc3 & 3) << 6) | enc4;

					output = output + String.fromCharCode(chr1);

					if (enc3 != 64) {
						output = output + String.fromCharCode(chr2);
					}
					if (enc4 != 64) {
						output = output + String.fromCharCode(chr3);
					}

					chr1 = chr2 = chr3 = "";
					enc1 = enc2 = enc3 = enc4 = "";

				} while (i < input.length);

				return output;
			}
	};

})();
