(function () {
	'use strict';

	angular
	.module('Alacarte.food')
	.controller('loginController', loginController);

	loginController.$inject = ['$location', 'AuthenticationService', 'FlashService','$scope','$rootScope','AUTH_EVENTS','$state','UserService'];
	function loginController($location, AuthenticationService, FlashService,$scope,$rootScope,AUTH_EVENTS,$state,UserService) {
		$scope.user = {};

		var locationUrl = $location;
		var searchObject = locationUrl.search();
		if(searchObject["token"] && searchObject["user"]) {
			$(".page-loading")
				.removeClass("hidden");
			$scope.user['email'] = searchObject["user"];
			$scope.user["token"] = searchObject["token"];
			AuthenticationService.LoginUsingToken($scope.user.email, $scope.user.token, function(response){
				console.log(response);
				if(response.success) {
					$(".page-loading")
						.addClass("hidden");
					AuthenticationService.SetCredentials($scope.user.email, $scope.user.token);
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$state.go('welcome');
				} else {
					$(".page-loading")
						.addClass("hidden");
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
					//FlashService.Error(response.message);
					$scope.loginerrormessage = "Failed to login in using other service providers";
				}
			});
		}

		$scope.login = function(form) {
			if(form.$invalid)
			{
				$scope.loginsubmitted = true;
				return;
			}
			$(".page-loading")
			.removeClass("hidden");
			AuthenticationService.Login($scope.user.email, $scope.user.password, function (response) {
				console.log(response);
				if (response.success) {
					$(".page-loading")
					.addClass("hidden");
					AuthenticationService.SetCredentials($scope.user.email, $scope.user.password);
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

					$state.go('welcome');
				} else {
					$(".page-loading")
					.addClass("hidden");
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
					//FlashService.Error(response.message);
					$scope.loginerrormessage = "The Password/Email you entered is incorrect";
				}
			});
		};

		$scope.hostlogin = function(form) {
			if(form.$invalid)
			{
				$scope.hostloginsubmitted = true;
				return;
			}

			$(".page-loading")
			.removeClass("hidden");
			AuthenticationService.Login($scope.user.email, $scope.user.password, function (response) {
				console.log(response);
				if (response.success) {
					$(".page-loading")
					.addClass("hidden");
					AuthenticationService.SetCredentials($scope.user.email, $scope.user.password);
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

					$state.go('hostregister.registertabs.introduction');
				} else {
					$(".page-loading")
					.addClass("hidden");
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
					$scope.hostloginerrormessage = "The Password/Email you entered is incorrect";
				}
			});
		};


		$scope.loginFacebook = function() {
			AuthenticationService.LoginFacebook(function(response){
				console.log(response);
				if(response.success) {

					//AuthenticationService.SetCredentials();
					$state.go('welcome');
				} else {
					console.log(response);
				}
			});
		};

		$scope.loginGoogle = function() {
			AuthenticationService.LoginGoogle(function(response){
				console.log(response);
				if(response.success) {

					//AuthenticationService.SetCredentials();
					$state.go('welcome');
				} else {
					console.log(response);
				}
			});
		};

		$scope.resetPassword = function(form) {
			if(form.$invalid)
			{
				$scope.resetsubmitted = true;
				return;
			}
			$(".page-loading")
			.removeClass("hidden");

			AuthenticationService.ResetPassword($scope.user.email, function(response){
				//console.log(response);
				$(".page-loading")
				.addClass("hidden");
				$scope.resetmessage = "Reset password will be sent to your registered email id please check your email";
			});
		};

		$scope.changePassword = function(form) {
			if(form.$invalid ||  $scope.user.newpassword2 != $scope.user.newpassword1 )
			{
				$scope.changepasswordsubmitted = true;
				return;
			}
			$(".page-loading")
			.removeClass("hidden");

			UserService.UserchangePassword($scope.user.newpassword1,$rootScope.resetuseremail,$rootScope.userresettoken)
			.then(function(response) {
				$(".page-loading")
				.addClass("hidden");
				console.log(response);
			});

		};

		$scope.signOut = function() {
			console.log($scope.user.email);
			AuthenticationService.SignOut($scope.user.email, $scope.user.accessToken, function(response){
				console.log(response);
			});
		};
	}
})();
