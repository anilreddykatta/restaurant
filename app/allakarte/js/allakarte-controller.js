/**
 * Created by anilkatta on 1/12/16.
 */
(function () {
	'use strict';
	angular
		.module ( 'Alacarte.food' )
		.controller ( 'MyAllakarteController', [ '$scope', '$location', 'AuthenticationService', '$rootScope', 'AllakarteService',
			function ( $scope, $location, AuthenticationService, $rootScope, AllakarteService ) {
				$scope.allakartes = {};
				AllakarteService.GetAllAllkartes ( AuthenticationService.getUserId () ).then ( function ( data ) {
					$scope.allakartes = data.allakartes;
				} );
			}
		] );
}) ();
