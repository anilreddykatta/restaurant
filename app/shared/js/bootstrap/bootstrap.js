/* bootstrap  Angular app for fetching common resources
 * removed ng-app from index page to use manual bootstrap
 * @ bootstrap module added
 */
(function ( orig ) {
	angular.modules = [];
	angular.module = function () {
		if ( arguments.length > 1 ) {
			angular.modules.push ( arguments[ 0 ] );
		}
		return orig.apply ( null, arguments );
	}
}) ( angular.module );

var myApplication = angular.module ( "Alacarte.food", [ 'Alacarte' ] );
var initInjector = angular.injector ( [ "ng" ] );
var $http = initInjector.get ( "$http" );

angular
	.element ( document )
	.ready (
		function () {

			// inject the http provider so that it can work even during
			// manual bootstrap
			// @
			myApplication
				.config ( [
					'$httpProvider',
					function ( $httpProvider ) {
						// initialize get if not there
						if ( ! $httpProvider.defaults.headers.get ) {
							$httpProvider.defaults.headers.get = {};
						}
						$httpProvider.defaults.headers.get[ 'If-Modified-Since' ] = 'Mon, 26 Jul 1997 05:00:00 GMT';
						$httpProvider.defaults.headers.get[ 'Cache-Control' ] = 'no-cache';
						$httpProvider.defaults.headers.get[ 'Pragma' ] = 'no-cache';
					} ] );
			// bootstrap app when DOM loaded
			angular.bootstrap ( document, [ "Alacarte.food" ] );

		} );


myApplication
	.controller (
		"parentCntl",
		[
			"$scope",
			"$rootScope",
			"$state",
			"$http",
			"$cookieStore",
			"AuthenticationService",
			"USER_ROLES",
			"$localStorage",
			'$timeout',
			function parentCntl ( $scope, $rootScope, $state,
								  $http, $cookieStore, AuthenticationService, USER_ROLES, $localStorage, $timeout ) {

				$scope.currentUser = null;
				$scope.userRoles = USER_ROLES;

				$scope.logOut = function () {
					AuthenticationService.ClearCredentials ();
				};
				$scope.query = {
					dob: '',
					name: '',
					place: '',
					components: {
						placeId: '',
						streetNumber: '',
						street: '',
						city: '',
						state: '',
						countryCode: '',
						country: '',
						postCode: '',
						location: {
							lat: '',
							long: ''
						}
					}
				};
				$scope.searchButtonText = "Search";
				$scope.mainSearchform = function ( form ) {
					if ( form.$invalid ) {
						$scope.mainformsubmitted = true;
						return;
					}
					// call api here to fetch data
					console.log ( $scope.query );
					$scope.searchButtonText = "Searching";

					$timeout ( function () {
						$scope.searchButtonText = "Search";
						$state.go ( 'guest' );
					}, 3000 );

				};
				console.log ( $scope.address );
				$scope.state = $state;
				$scope.result1 = '';
				$scope.options1 = null;
				$scope.details1 = '';

				//UI calander options
				$scope.calendar = {
					dateFormat: 'MM/dd/yyyy',
					dateOptions: {}
				};
				$scope.openDatePickers = [];
				// create datapicker array of 50 index
				for ( var i = 0; i < 10; i ++ ) {
					{
						$scope.openDatePickers.push ( false );
					}
				}
				$scope.open = function ( $event, datePickerIndex ) {
					$event.preventDefault ();
					$event.stopPropagation ();

					if ( $scope.openDatePickers[ datePickerIndex ] === true ) {
						$scope.openDatePickers.length = 0;
					} else {
						$scope.openDatePickers.length = 0;
						$scope.openDatePickers[ datePickerIndex ] = true;
					}
				};

			} ] )
	.constant ( 'AUTH_EVENTS', {
		loginSuccess: 'auth-login-success',
		loginFailed: 'auth-login-failed',
		logoutSuccess: 'auth-logout-success',
		sessionTimeout: 'auth-session-timeout',
		notAuthenticated: 'auth-not-authenticated',
		notAuthorized: 'auth-not-authorized',
		loginmessage: ' invalid userid and password',
		registermessage: 'unable to register user',
		resetmessage: 'Reset password will be sent to your registered email id please check your email'
	} )
	.constant ( 'USER_ROLES', {
		all: '*',
		admin: 'admin',
		guest: 'guest',
		host: 'host'
	} );

console.log ( "Modules in the applciation bootstrap" );
console.log ( angular.modules );
