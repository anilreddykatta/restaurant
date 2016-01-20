/**
 * Created by anilkatta on 1/9/16.
 */
var Allakarte = require("./../models/allakarte");

var allakarteUtils = function() {
	this.CreateDishItemFromRequestBody = CreateDishItemFromRequestBody;
	this.UpdateOneModalFromJSONData = updateonemodalfromjsondata;
};

function CreateDishItemFromRequestBody(jsonData) {
	var DishItem = new Allakarte.DishItem();
	DishItem.name = jsonData.name;
	DishItem.description = jsonData.description;
	DishItem.price = jsonData.price;
	DishItem.photolinks = [];
	DishItem.allergens = jsonData.allergens;
	DishItem.advance_booking_time = jsonData.advance_booking_time;
	DishItem.is_show_or_cooking_recipe_shared = jsonData.is_show_or_cooking_recipe_shared;
	return DishItem;
}

function UpdateOneModalFromJSONData(dishItemModel, jsonData) {
	dishItemModel.name = jsonData.name;
	dishItemModel.description = jsonData.description;
	dishItemModel.price = jsonData.price;
	dishItemModel.advance_booking_time = jsonData.advance_booking_time;
	dishItemModel.is_show_or_cooking_recipe_shared = jsonData.is_show_or_cooking_recipe_shared;
	dishItemModel.allergens = jsonData.allergens;
}


module.exports = new allakarteUtils();
