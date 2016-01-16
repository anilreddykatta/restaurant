/**
 * Created by anilkatta on 1/12/16.
 */
(function () {
	'use strict';
	angular
		.module ( 'Alacarte.food')
		.controller ( 'MyAllakarteController', [ '$scope', 'AuthenticationService', 'AllakarteService', '$log', '$uibModal',
			function ($scope, AuthenticationService, AllakarteService, $log, $uibModal) {
				$scope.allakarte = {};
				$scope.animationEnabled = true;
				$scope.searchText = '';
				$scope.test = null;
				$scope.pagination = [];
				$scope.PAGINATION_LIMIT = 5;
				$scope.showPagination = false;

				AllakarteService.GetAllAllkartes ( AuthenticationService.getUserId () ).then ( function ( response ) {
					if(response.success) {
						$scope.allakarte = response.allakartes[0];
						if($scope.allakarte.dish_items) {
							for(var dish_item_index = 0; dish_item_index < $scope.allakarte.dish_items.length; dish_item_index++) {
								$scope.allakarte.dish_items[dish_item_index]['expanded'] = false;
							}
							$scope.allakarte['expanded'] = true;
							//TODO: Logic for pagination limit

							//Adding watch in case we have some dish_items otherwise doesn't make any sense
							$scope.$watch('searchText', function(newValue, oldValue){
								console.log(newValue);
								console.log(oldValue);
								AllakarteService.GetAllDishItems(AuthenticationService.getUserId(), $scope.allakarte.allakarte_id, newValue ).then(function(response){
									if(response.success) {
										$scope.allakarte.dish_items = [];
										if(response.dish_items) {
											for(var dish_item_index = 0; dish_item_index < response.dish_items.length; dish_item_index++) {
												response.dish_items[dish_item_index]['expanded'] = false;
												$scope.allakarte.dish_items.push(response.dish_items[dish_item_index]);
											}
											$scope.allakarte['expanded'] = true;
										} else {
											$scope.allakarte['expanded'] = false;
										}
									} else {
										console.log("Error in fetching dish items based on search queries");
									}
								});
							});

						} else {
							$scope.allakarte['expanded'] = false;
						}
					}
				});

				$scope.CreateAllkarte = function() {
					AllakarteService.CreateAllkarte(AuthenticationService.getUserId() ).then(function(response) {
						if(response.success) {
							for(var dish_item_index = 0; dish_item_index < response.dish_items.length; dish_item_index++) {
								response.allakarte.dish_items[dish_item_index]['expanded'] = false;
							}
							$scope.allakarte = response.allakarte;
						}
					});
				};

				$scope.initPagination = function() {
					if($scope.allakarte.dish_items && $scope.allakarte.dish_items.length > $scope.PAGINATION_LIMIT) {
						$scope.showPagination = true;
					} else {
						$scope.showPagination = false;
					}
				};

				$scope.goToPage = function(pageNumber) {
					//TODO: implement pagination logic, should we fetch results as required or just manipulate results in javascript
				};

				$scope.CreateModalInstance = function() {
					var modalInstance = $uibModal.open({
						animation: $scope.animationEnabled,
						templateUrl: 'dishItemmodal.html',
						controller: 'ModalInstanceController',
						size: 'lg',
						resolve: {
							dish_item: function () {
								return $scope.dish_item;
							},
							user_id: function() {
								return AuthenticationService.getUserId();
							},
							allakarte : function() {
								return $scope.allakarte;
							}
						}
					});
					return modalInstance;
				};

				$scope.AddItem = function(allakarte) {
					$scope.allakarte = allakarte;
					$scope.dish_item = {};
					$log.info("Inside Open Dialog");
					var modalInstance = $scope.CreateModalInstance();
					modalInstance.result.then(function (dish_item) {
						allakarte.dish_items.push(dish_item);
						$scope.dish_item = {};
					}, function () {
						$log.info('Modal dismissed at: ' + new Date());
					});
				};

				$scope.EditItem = function(dish_item, allakarte) {
					$scope.allakarte = allakarte;
					$scope.dish_item = dish_item;
					$log.info("Inside Open Dialog");
					var modalInstance = $scope.CreateModalInstance();
					modalInstance.result.then(function (dish_item) {
						for(var index = 0; index < allakarte.dish_items; index++) {
							if(allakarte.dish_items[index].dish_item_id == dish_item.dish_item_id) {
								allakarte.dish_items[index] = dish_item;
								break;
							}
						}
						$scope.dish_item = {};
					}, function () {
						$log.info('Modal dismissed at: ' + new Date());
					});
				};

				$scope.RemoveItem = function(dish_item, allakarte) {
					var modalInstance = $uibModal.open({
						animation: $scope.animationEnabled,
						templateUrl: 'deleteConfirmation.html',
						controller: 'DeleteModalInstanceController',
						size: 'lg',
						resolve: {
							dish_item: function () {
								return dish_item;
							},
							user_id: function() {
								return AuthenticationService.getUserId();
							},
							allakarte : function() {
								return $scope.allakarte;
							}
						}
					});

					modalInstance.result.then(function (dish_item) {
						for(var index = 0; index < allakarte.dish_items.length; index++) {
							if(allakarte.dish_items[index].dish_item_id == dish_item.dish_item_id) {
								allakarte.dish_items.splice(index, 1);
							}
						}
						$scope.dish_item = {};
					}, function () {
						$log.info('Modal dismissed at: ' + new Date());
					});
				};
			}
		] )
		.controller('ModalInstanceController', ['$scope', '$uibModalInstance', 'AllakarteService', 'dish_item', 'user_id', 'allakarte', function($scope, $uibModalInstance, AllakarteService, dish_item, user_id, allakarte) {
			$scope.dish_item = dish_item;
			$scope.dish_items_ids = [];
			$scope.showError = false;
			$scope.error = '';
			if(allakarte.dish_items) {
				for(var index = 0; index < allakarte.dish_items.lenth; index++) {
					$scope.dish_items_ids.push(allakarte.dish_items[index ].dish_item_id);
				}
			}

			$scope.save = function() {
				if($scope.dish_item.dish_item_id) {
					AllakarteService.UpdateDishItem(user_id, allakarte.allakarte_id, dish_item ).then(function(response){
						if(response.success) {
							for(var index = 0; index < response.allakarte.dish_items; index++) {
								if($scope.dish_items_ids.indexOf(response.allakarte.dish_items[index ].dish_item_id) != -1) {
									$scope.dish_item = response.allakarte.dish_items[index];
								}
							}
							$uibModalInstance.close($scope.dish_item);
						} else {
							$scope.error = 'Failed to update dish item';
							$scope.showError = true;
						}
					});
				} else {
					AllakarteService.CreateDishItem(user_id, allakarte.allakarte_id, dish_item ).then(function(response){
						if(response.success) {
							for(var index = 0; index < response.allakarte.dish_items; index++) {
								if($scope.dish_items_ids.indexOf(response.allakarte.dish_items[index ].dish_item_id) != -1) {
									$scope.dish_item = response.allakarte.dish_items[index];
								}
							}
							$uibModalInstance.close($scope.dish_item);
						} else {
							$scope.error = 'Failed to create dish item';
							$scope.showError = true;
						}
					});
				}

			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};
		}])
		.controller('DeleteModalInstanceController',  ['$scope', '$uibModalInstance', 'AllakarteService', 'dish_item', 'user_id', 'allakarte', function($scope, $uibModalInstance, AllakarteService, dish_item, user_id, allakarte) {
			$scope.dish_item = dish_item;
			$scope.showError = false;
			$scope.error = '';
			$scope.delete = function() {
				AllakarteService.RemoveDishItem(user_id, allakarte.allakarte_id, dish_item ).then(function(response){
					if(response.success) {
						$uibModalInstance.close($scope.dish_item);
					} else {
						$scope.error = 'Failed to create dish item';
						$scope.showError = true;
					}
				});
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};
		}]);
}) ();
