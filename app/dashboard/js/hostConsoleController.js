(function () {
	'use strict';

	angular
	.module('Alacarte.food')
	.controller('hostConsoleController', hostConsoleController);

	hostConsoleController.$inject = ['$location', 'AuthenticationService', 'FlashService','$scope','$rootScope','$localStorage'];
	function hostConsoleController($location, AuthenticationService, FlashService,$scope,$rootScope,$localStorage) {

		$scope.priceSlider = {
				min: 100,
				max: 180,
				ceil: 500,
				floor: 0
		};

		$scope.openHostModal = function() {
			if(AuthenticationService.isLoggedIn())
			{
				$location.path('/hostregister');
			}
			else
			{
				$rootScope.showModal = true;
			}

		};

		$scope.ok = function() {
			$rootScope.showModal = false;
		};

		$scope.cancel = function() {
			$rootScope.showModal = false;
		};
		$scope.passwordModal = function() {
			$rootScope.showModal = false;
			$location.path('/password');
		};
		$scope.registerModal = function() {
			$rootScope.showModal = false;
			$location.path('/register');
		};

	}

})();