(function () {
    'use strict';

    angular
        .module('Alacarte.food')
        .controller('WelcomeController', WelcomeController)
		.controller('InfoModalController', InfoModalController);

    WelcomeController.$inject = ['$location', '$scope','$rootScope','$state', '$uibModal'];
	InfoModalController.$inject = ['$scope', '$uibModalInstance'];
	function InfoModalController($scope, $uibModalInstance) {
		$scope.close = function() {
			$uibModalInstance.dismiss("");
		};
	}

    function WelcomeController($location, $scope, $rootScope, $state, $uibModal) {
		$scope.animationEnabled = true;
    	$scope.close = function()
    	{
    		$scope.IntroModal = false;
    	};

		$scope.openDialog = function() {
			var modalInstance = $uibModal.open({
				animation: $scope.animationEnabled,
				templateUrl: 'infoModal.html',
				controller: 'InfoModalController',
				size: 'lg'
			});

			modalInstance.result.then(function () {

			}, function () {
			});
		};

		$scope.openDialog();
    }
})();
