(function () {
    'use strict';

    angular
        .module('Alacarte.food')
        .controller('WelcomeController', WelcomeController);

    WelcomeController.$inject = ['$location', '$scope','$rootScope','$state'];
    function WelcomeController($location,$scope,$rootScope$state) {
    	
    	
    	$scope.IntroModal = true;
    	
    	$scope.close = function()
    	{
    		$scope.IntroModal = false;
    	}
    	
    }

})();