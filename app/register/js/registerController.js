(function () {
	'use strict';

	angular
	.module('Alacarte.food')
	.controller('registerController', registerController);

	registerController.$inject = ['UserService', '$location', '$rootScope', 'FlashService','$scope'];
	function registerController(UserService, $location, $rootScope, FlashService,$scope) {

		$scope.user = {};
		$scope.register = function(form) {

			if(form.$invalid)
			{
				$scope.registersubmitted = true;
				return;
			}

			$(".page-loading")
			.removeClass("hidden");
			UserService.Create($scope.user)
			.then(function (response) {
				if (response.success) {
					$(".page-loading")
					.addClass("hidden");
					FlashService.Success('Registration successful', true);
					$location.path('/login');
				} else {
					$(".page-loading")
					.addClass("hidden");
					$scope.registererrormessage = response.error;
						//FlashService.Error(response);
						$scope.dataLoading = false;
				}
			});
		}
	}

})();
