/**
 * Created by anilkatta on 1/12/16.
 */
(function () {
	'use strict';
	angular
		.module ( 'Alacarte.food' )
		.factory ( 'AllakarteService', AlakarteService );

	AlakarteService.$inject = ['$http'];

	function AlakarteService ( $http ) {
		var service = {};
		service.GetAllAllkartes = GetAllAllkartes;
		return service;

		function GetAllAllkartes ( user_id, callback ) {
			return $http.get ( '/api/users/' + user_id + "/allakartes" ).then ( handleSuccess, handleError ( "Error in fetching allakartes" ) );
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
}) ();
