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
		service.CreateAllkarte = CreateAllkarte;
		service.GetAllAllkartes = GetAllAllkartes;
		service.UpdateDishItem = UpdateDishItem;
		service.RemoveDishItem = RemoveDishItem;
		service.CreateDishItem = CreateDishItem;
		service.GetAllDishItems =  GetAllDishItems;
		return service;

		function CreateAllkarte(user_id, callback) {
			return $http.post('/api/users/' + user_id + "/allakartes" ).then(handleSuccess, handleError("Error in creating allakarte"));
		}

		function GetAllAllkartes ( user_id, callback ) {
			return $http.get( '/api/users/' + user_id + "/allakartes" ).then ( handleSuccess, handleError ( "Error in fetching allakartes" ) );
		}

		function GetAllDishItems(user_id, allakarte_id, search_text_for_name, callback) {
			return $http.get('/api/users/' + user_id + "/allakartes/"+allakarte_id+"/dish_items/name/"+search_text_for_name ).then(handleSuccess, handleError("Error in fetching dish items"));
		}

		function RemoveDishItem (user_id, allakarte_id, dish_item, callback) {
			return $http.delete('/api/users/' + user_id + "/allakartes/"+allakarte_id+"/dish_items/"+dish_item.dish_item_id ).then(handleSuccess, handleError("Error in deleting"));
		}

		function UpdateDishItem (user_id, allakarte_id, dish_item, callback) {
			return $http.put('/api/users/' + user_id + "/allakartes/"+allakarte_id+"/dish_items/"+dish_item.dish_item_id, {dish_item: dish_item}).then(handleSuccess, handleError("Error in Updating"));
		}

		function CreateDishItem(user_id, allakarte_id, dish_item, callback) {
			return $http.post('/api/users/' + user_id + "/allakartes/"+allakarte_id+"/dish_items", {dish_item: dish_item}).then(handleSuccess, handleError("Error in Updating"));
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
