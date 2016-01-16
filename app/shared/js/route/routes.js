angular.module ( 'Alacarte.food' ).config ( config );
config.$inject = [ '$stateProvider', '$urlRouterProvider', 'USER_ROLES' ];
function config ( $stateProvider, $urlRouterProvider, USER_ROLES ) {

	//  $locationProvider.html5Mode(true);

	$stateProvider
		.state (
			"home",
			{
				url: "/",
				templateUrl: "app/home/home.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ],
					secure: false
				}
			} )

		.state ( "signout", {
			url: "/signout",
			templateUrl: "app/home/home.html",
			data: {
				authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ],
				secure: false
			},
			onEnter: [ '$state', 'AuthenticationService', function ( $state, AuthenticationService ) {
				AuthenticationService.ClearCredentials ();
				$state.go ( 'login' );
			} ]
		} )

		.state (
			"guest",
			{
				url: "/guest",
				templateUrl: "app/guestconsole/guest.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ],
					secure: false
				}
			} )
		.state (
			"guest.hostitems",
			{
				url: "/hostitems",
				templateUrl: "app/guestconsole/hostitems.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ],
					secure: false
				}
			} )
		.state (
			"welcome",
			{
				url: "/welcome",
				templateUrl: "app/startapp/welcome.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ],
					secure: false
				}
			} )
		.state (
			"allakarte",
			{
				url: "/allakarte",
				templateUrl : "app/allakarte/myallakarte.html",
				data: {
					authorizedRoles: [USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest],
					secure: false
				}
			}
		)
		.state (
			"cities",
			{
				url: "/cities",
				templateUrl: "app/guestconsole/cities.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ],
					secure: false
				}
			} )
		.state (
			"login",
			{
				url: "/login",
				templateUrl: "app/login/login.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ],
				},
				onEnter: [ '$state', 'AuthenticationService', function ( $state, AuthenticationService ) {
					if ( AuthenticationService.isLoggedIn () ) {
						$state.go ( 'home' );
					}
					;
				} ]
			} )
		.state (
			"password",
			{
				url: "/password",
				templateUrl: "app/login/resetpassword.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ]
				},
				onEnter: [ '$state', 'AuthenticationService', function ( $state, AuthenticationService ) {
					if ( AuthenticationService.isLoggedIn () ) {
						$state.go ( 'home' );
					}
					;
				} ]
			} )

		.state (
			"changepassword",
			{
				url: "/changepassword/:email/:token",
				templateUrl: "app/login/changepassword.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ]
				},
				onEnter: [ '$state', '$stateParams', 'AuthenticationService', function ( $state, $stateParams, AuthenticationService ) {
					if ( AuthenticationService.changepassword ( $stateParams.email, $stateParams.token ) ) {
						//$state.go('home');
						console.log ( $stateParams.email );
					};
				} ]

			} )
		.state (
			"register",
			{
				url: "/register",
				templateUrl: "app/register/register.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ]
				},
				onEnter: [ '$state', 'AuthenticationService', function ( $state, AuthenticationService ) {
					if ( AuthenticationService.isLoggedIn () ) {
						$state.go ( 'home' );
					}
					;
				} ]
			} )
		.state (
			"host",
			{
				url: "/host",
				templateUrl: "app/hostconsole/host.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host, USER_ROLES.guest ],
					secure: false
				}
			} )
		.state (
			"hostregister",
			{
				abstract: true,
				url: "/hostregister",
				templateUrl: "app/hostconsole/hostregister.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true

				}
			} )
		.state (
			"hostregister.registertabs",
			{
				abstract: true,
				url: "/registertabs",
				templateUrl: "app/hostconsole/hostregistertabs.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.eventPreviewtabs",
			{
				abstract: true,
				url: "/eventPreviewtabs",
				templateUrl: "app/hostconsole/eventPreviewtabs.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.eventPreviewtabs.preview",
			{
				url: "/preview",
				templateUrl: "app/hostconsole/preview/preview.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.myEvents",
			{
				url: "/myEvents",
				templateUrl: "app/hostconsole/myEvents.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.registertabs.introduction",
			{
				url: "/introduction",
				templateUrl: "app/hostconsole/introduction.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				},

				onEnter: [ '$state', 'AuthenticationService', function ( $state, AuthenticationService ) {
					if ( ! AuthenticationService.isLoggedIn () ) {
						$state.go ( 'home' );
					}
					;
				} ]
			} )
		.state (
			"hostregister.registertabs.menu",
			{
				url: "/menu",
				templateUrl: "app/hostconsole/menu.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.registertabs.photo",
			{
				url: "/photo",
				templateUrl: "app/hostconsole/photo.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )

		.state (
			"hostregister.registertabs.fooditems",
			{
				url: "/fooditems",
				templateUrl: "app/hostconsole/fooditems.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.registertabs.date",
			{
				url: "/date",
				templateUrl: "app/hostconsole/date.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.registertabs.pricing",
			{
				url: "/pricing",
				templateUrl: "app/hostconsole/pricing.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.registertabs.guest",
			{
				url: "/guest",
				templateUrl: "app/hostconsole/guest.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.registertabs.address",
			{
				url: "/address",
				templateUrl: "app/hostconsole/address.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.registertabs.location",
			{
				url: "/location",
				templateUrl: "app/hostconsole/location.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"hostregister.registertabs.profile",
			{
				url: "/profile",
				templateUrl: "app/hostconsole/profile.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"catalog",
			{
				abstract: true,
				url: "/catalog",
				data: {
					secure: true
				},
				templateUrl: "app/benefitcatalog/benefitcatalog.html",
				controller: "BenefitCatalogController",


			} )
		.state (
			"dashboard",
			{
				abstract: true,
				url: "/dashboard",
				templateUrl: "app/dashboard/dashboard.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true

				}
			} )
		.state (
			"dashboard.myProfiletabs",
			{
				abstract: true,
				url: "/myProfiletabs",
				templateUrl: "app/dashboard/myProfiletabs.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				}
			} )
		.state (
			"dashboard.myProfiletabs.myProfile",
			{
				url: "/myProfile",
				templateUrl: "app/dashboard/myProfile.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true
				},

				onEnter: [ '$state', 'AuthenticationService', function ( $state, AuthenticationService ) {
					if ( ! AuthenticationService.isLoggedIn () ) {
						$state.go ( 'home' );
					}
					;
				} ]
			} )
		.state (
			"dashboard.userDashboard",
			{

				url: "/userDashboard",
				templateUrl: "app/dashboard/userDashboard.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true

				}
			} )
		.state (
			"dashboard.userAccounttabs",
			{
				abstract: true,
				url: "/userAccounttabs",
				templateUrl: "app/dashboard/userAccounttabs.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true

				}
			} )
		.state (
			"dashboard.userAccounttabs.myAccount",
			{
				url: "/myAccount",
				templateUrl: "app/dashboard/myAccount.html",
				data: {
					authorizedRoles: [ USER_ROLES.admin, USER_ROLES.host ],
					secure: true

				}
			} );
	$urlRouterProvider.when ( "/hostregister",
		"/hostregister/registertabs/introduction" );
	$urlRouterProvider.when ( "/hostregister/registertabs",
		"/hostregister/registertabs/introduction" );

	$urlRouterProvider.when ( "/dashboard",
		"/dashboard/myProfiletabs/myProfile" );
	$urlRouterProvider.when ( "/dashboard/myProfiletabs",
		"/dashboard/myProfiletabs/myProfile" );

	$urlRouterProvider.when ( "/dashboard/userAccounttabs",
		"/dashboard/userAccounttabs/myAccount" );

	$urlRouterProvider.otherwise ( "/" );


}

/*angular
 .module('Alacarte.food').config(["$locationProvider", function($locationProvider) {
 $locationProvider.html5Mode(true);
 }]);*/

angular
	.module ( 'Alacarte.food' )
	.run (
		[
			'$rootScope',
			'$location',
			'$stateParams',
			'$http',
			'$state',
			'$q',
			'$cookieStore',
			'AuthenticationService',
			'AUTH_EVENTS',
			'$localStorage',
			'FlashService',
			function ( $rootScope, $location, $stateParams, $http,
					   $state, $q, $cookieStore, AuthenticationService, AUTH_EVENTS, $localStorage, FlashService ) {

				$rootScope
					.$on (
						'$stateChangeStart',
						function ( event, toState, toParams,
								   fromState, fromParams ) {
							FlashService.clearFlashMessage ();
							$ ( ".page-loading" )
								.removeClass ( "hidden" );

						} );

				$rootScope.$on ( '$stateChangeError', function ( event,
																 toState, toParams, fromState, fromParams ) {

					$ ( ".page-loading" ).addClass ( "hidden" );

				} );

				$rootScope
					.$on (
						'$stateChangeSuccess',
						function ( event, toState, toParams,
								   fromState, fromParams ) {
							$rootScope.loading = false;
							// get user name on route change success
							$rootScope.isLoggedIn = AuthenticationService.isLoggedIn ();
							$rootScope.currentUser = AuthenticationService.getCurrentUser ();
							if ( $rootScope.currentUser ) {
								$rootScope.currentUserName = $rootScope.currentUser.username;
							}
							console.log ( $rootScope.currentUser );
							$ ( ".page-loading" ).addClass ( "hidden" );
							if ( $state.current.name != 'home' ) {
								var myEl = angular.element ( document.querySelector ( '#videoHeader' ) );
								myEl.hide ();
							}
							else {
								var myEl = angular.element ( document.querySelector ( '#videoHeader' ) );
								myEl.show ();
							}

						} );

			} ] );


angular
	.module ( 'Alacarte.food' ).filter ( "trustUrl", [ '$sce', function ( $sce ) {
	return function ( recordingUrl ) {
		return $sce.trustAsResourceUrl ( recordingUrl );
	};
} ] );
