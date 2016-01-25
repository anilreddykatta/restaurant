(function () {
	'use strict';
	angular.module ( 'Alacarte.food' ).controller ( 'loginController', loginController );

	loginController.$inject = [ '$location', 'AuthenticationService', 'FlashService', '$scope', '$rootScope', 'AUTH_EVENTS', '$state', 'UserService' ];
	function loginController ( $location, AuthenticationService, FlashService, $scope, $rootScope, AUTH_EVENTS, $state, UserService ) {
		$scope.user = {};
		var locationUrl = $location;
		var searchObject = locationUrl.search ();
		if ( searchObject[ "token" ] && searchObject[ "user" ] ) {
			$ ( ".page-loading" ).removeClass ( "hidden" );
			$scope.user[ 'email' ] = searchObject[ "user" ];
			$scope.user[ "token" ] = searchObject[ "token" ];
			AuthenticationService.LoginUsingToken ( $scope.user.email, $scope.user.token, function ( response ) {
				if ( response.success ) {
					$scope.user.user_id = response.user.user_id;
					$ ( ".page-loading" ).addClass ( "hidden" );
					AuthenticationService.SetCredentials ( $scope.user.email, $scope.user.token, $scope.user.user_id );
					AuthenticationService.saveToken ( $scope.user.token );
					AuthenticationService.saveUserId ( $scope.user.user_id );
					AuthenticationService.saveUserName ( $scope.user.email );
					$rootScope.$broadcast ( AUTH_EVENTS.loginSuccess );
					$state.go ( 'welcome' );
				} else {
					$ ( ".page-loading" ).addClass ( "hidden" );
					$rootScope.$broadcast ( AUTH_EVENTS.loginFailed );
					//FlashService.Error(response.message);
					$scope.loginerrormessage = "Failed to login in using other service providers";
				}
			} );
		}

		$scope.login = function ( form ) {
			if ( form.$invalid ) {
				$scope.loginsubmitted = true;
				return;
			}
			$ ( ".page-loading" ).removeClass ( "hidden" );
			AuthenticationService.Login ( $scope.user.email, $scope.user.password, function ( response ) {
				if ( response.success ) {
					$scope.user.user_id = response.user.user_id;
					$scope.user.token = response.user.token;
					$ ( ".page-loading" ).addClass ( "hidden" );
					AuthenticationService.SetCredentials ( $scope.user.email, $scope.user.token, $scope.user.user_id );
					AuthenticationService.saveToken ( $scope.user.token );
					AuthenticationService.saveUserId ( $scope.user.user_id );
					AuthenticationService.saveUserName ( $scope.user.email );
					$rootScope.$broadcast ( AUTH_EVENTS.loginSuccess );
					$state.go ( 'welcome' );
				} else {
					$ ( ".page-loading" ).addClass ( "hidden" );
					$rootScope.$broadcast ( AUTH_EVENTS.loginFailed );
					$scope.loginerrormessage = "The Password/Email you entered is incorrect";
				}
			} );
		};

		$scope.hostlogin = function ( form ) {
			if ( form.$invalid ) {
				$scope.hostloginsubmitted = true;
				return;
			}
			$ ( ".page-loading" ).removeClass ( "hidden" );
			AuthenticationService.Login ( $scope.user.email, $scope.user.password, function ( response ) {
				console.log ( response );
				if ( response.success ) {
					$ ( ".page-loading" ).addClass ( "hidden" );
					$scope.user.user_id = response.user.user_id;
					AuthenticationService.SetCredentials ( $scope.user.email, $scope.user.token, $scope.user.user_id );
					AuthenticationService.saveToken ( $scope.user.token );
					AuthenticationService.saveUserId ( $scope.user.user_id );
					AuthenticationService.saveUserName ( $scope.user.username );
					$rootScope.$broadcast ( AUTH_EVENTS.loginSuccess );
					$state.go ( 'hostregister.registertabs.introduction' );
				} else {
					$ ( ".page-loading" ).addClass ( "hidden" );
					$rootScope.$broadcast ( AUTH_EVENTS.loginFailed );
					$scope.hostloginerrormessage = "The Password/Email you entered is incorrect";
				}
			} );
		};

		$scope.resetPassword = function ( form ) {
			if ( form.$invalid ) {
				$scope.resetsubmitted = true;
				return;
			}
			$ ( ".page-loading" ).removeClass ( "hidden" );

			AuthenticationService.ResetPassword ( $scope.user.email, function ( response ) {
				console.log ( response );
				if ( response.success ) {
					$ ( ".page-loading" )
						.addClass ( "hidden" );
					$scope.resetmessage = "Reset password will be sent to your registered email id please check your email";
				} else {
					$ ( ".page-loading" )
						.addClass ( "hidden" );
					$scope.resetsubmitted = true;
					$scope.notregisteredmail = true;
				}
			} );
		};

		$scope.changePassword = function ( form ) {
			if ( form.$invalid || $scope.user.newpassword2 != $scope.user.newpassword1 ) {
				$scope.changepasswordsubmitted = true;
				return;
			}
			$ ( ".page-loading" ).removeClass ( "hidden" );
			UserService.UserChangePassword ( $scope.user.newpassword1, $rootScope.resetuseremail, $rootScope.userresettoken )
				.then ( function ( response ) {
					$ ( ".page-loading" ).addClass ( "hidden" );
				} );
		};

		$scope.signOut = function () {
			AuthenticationService.SignOut ( $scope.user.email, $scope.user.accessToken, function ( response ) {
				//console.log(response);
			} );
		};
	}
}) ();
