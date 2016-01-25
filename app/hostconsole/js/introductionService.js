/**
 * Created by anilkatta on 1/25/16.
 */
(function(){
	'use strict';
	angular
		.module('Alacarte.food')
		.factory('IntroductionService', IntroductionService);

	IntroductionService.$inject = ['$http'];

	function IntroductionService($http) {
		var service = {};
		service.TestService  = testService;

		return service;

		function testService () {
			return $http().then(handleSuccess, handleError("Error in getting all the services"));
		}

		function handleSuccess ( res ) {
			return res.data;
		}

		function handleError ( error ) {
			return function () {
				return { success: false, message: error };
			};
		}
	}
})();
