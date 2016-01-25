/**
 * Created by anilkatta on 1/22/16.
 */
(function () {
	'use strict';
	angular
		.module ( 'Alacarte.food' )
		.controller ( 'IntroductionController', [ '$location', 'AuthenticationService', 'FlashService', '$scope', '$rootScope', '$localStorage', function IntroductionController ( $location, AuthenticationService, FlashService, $scope, $rootScope, $localStorage ) {
			$scope.ListingType = [ "Break fast", "Lunch", "Dinner", "Wine Tour", "Food Tour", "Cooking Class", "Snacks & Drinks", "Brunch", "Food Experience" ];
			$scope.EventData = {timeOfEvent: ''};
			$scope.parent = {checkOut:''};

			$scope.Init = function() {
				$scope.EventData['title'] = null;
				$scope.EventData['description'] = null;
				$scope.EventData['allergens'] = null;
				$scope.EventData['listingType'] = null;
				$scope.EventData['timeOfEvent'] = null;
				$scope.EventData['cuisineType'] = null;
			};

			$scope.NextEventButton = function () {
				$scope.EventData.timeOfEvent = $scope.selecteddate;
				console.log ( $scope.EventData );
			};

			$("#timeOfEventInput").on("dp.change", function() {
				$scope.selecteddate = $("#timeOfEventInput").val();
				alert("selected date is " + $scope.selecteddate);
			});

			$scope.Init();
		} ] );
}) ();
