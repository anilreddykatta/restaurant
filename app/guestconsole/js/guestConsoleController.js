(function () {
	'use strict';

	angular
	.module('Alacarte.food')
	.controller('guestConsoleController', guestConsoleController);
	
	

	guestConsoleController.$inject = ['$location', 'AuthenticationService', 'FlashService','$scope','uiGmapGoogleMapApi','uiGmapIsReady'];
	function guestConsoleController($location, AuthenticationService, FlashService,$scope , uiGmapGoogleMapApi, uiGmapIsReady) {

		$scope.priceSlider = {
				min: 100,
				max: 180,
				ceil: 500,
				floor: 0
		};



		uiGmapGoogleMapApi
		.then(function(maps){
			$scope.googlemap = {};
			$scope.map = {
					center: {
						latitude: 37.78,
						longitude: -122.41
					},
					zoom: 14,
					pan: 1,
					options: $scope.mapOptions,
					control: {},
					events: {
						tilesloaded: function (maps, eventName, args) {
						},
						dragend: function (maps, eventName, args) {
						},
						zoom_changed: function (maps, eventName, args) {
						}
					}
			};
		});

		$scope.windowOptions = {
				show: false
		};

		$scope.onClick = function(data) {
			$scope.windowOptions.show = !$scope.windowOptions.show;
			console.log('$scope.windowOptions.show: ', $scope.windowOptions.show);
			console.log('This is a ' + data);
			alert('This is a ' + data);
		};

		$scope.closeClick = function() {
			$scope.windowOptions.show = false;
		};

		$scope.title = "Window Title!";

		uiGmapIsReady.promise()                                    // if no value is put in promise() it defaults to promise(1)
		.then(function(instances) {
			console.log(instances[0].map);                        // get the current map
		})
		.then(function(){
			$scope.addMarkerClickFunction($scope.markers);
		});

		$scope.markers = [
		                  {
		                	  id: 0,
		                	  coords: {
		                		  latitude: 37.7749295,
		                		  longitude: -122.4194155
		                	  },
		                	  data: 'restaurant'
		                  },
		                  {
		                	  id: 1,
		                	  coords: {
		                		  latitude: 37.79,
		                		  longitude: -122.42
		                	  },
		                	  data: 'house'
		                  },
		                  {
		                	  id: 2,
		                	  coords: {
		                		  latitude: 37.77,
		                		  longitude: -122.41
		                	  },
		                	  data: 'hotel'
		                  }
		                  ];

		$scope.addMarkerClickFunction = function(markersArray){
			angular.forEach(markersArray, function(value, key) {
				value.onClick = function(){
					$scope.onClick(value.data);
				};
			});
		};  


		$scope.MapOptions = {
				minZoom : 3,
				zoomControl : false,
				draggable : true,
				navigationControl : false,
				mapTypeControl : false,
				scaleControl : false,
				streetViewControl : false,
				disableDoubleClickZoom : false,
				keyboardShortcuts : true,
				styles : [{
					featureType : "poi",
					elementType : "labels",
					stylers : [{
						visibility : "off"
					}]
				}, {
					featureType : "transit",
					elementType : "all",
					stylers : [{
						visibility : "off"
					}]
				}],
		};


	}

})();

