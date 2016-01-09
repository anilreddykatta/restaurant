/**
 * Created by anilkatta on 1/9/16.
 */
var Allakarte = require("./../models/allakarte");

var allakarteUtils = function() {
	this.CreateDishItemFromRequestBody = CreateDishItemFromRequestBody;
};

function CreateDishItemFromRequestBody(jsonData) {
	var DishItem = new Allakarte.DishItem();
	DishItem.name = jsonData.name;
	DishItem.description = jsonData.description;
	DishItem.price = jsonData.price;
	DishItem.photolinks = [];
	DishItem.allergens = jsonData.allergens;
	DishItem.advance_booking_time = jsonData.advancebookingtime;
	DishItem.is_show_or_cooking_recipe_shared = jsonData.isshoworcookingrecipeshared;

	return DishItem;
}


module.exports = new allakarteUtils();
