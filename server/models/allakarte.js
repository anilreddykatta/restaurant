/**
 * Created by anilkatta on 1/9
 **/

var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var User = require("./user");
var UUID = require("node-uuid");

//Collection name
var CollectionName = 'allakarte';

var DishItemSchema = new Schema({
	dish_id: {type: String, default: function getUUID(){
		return UUID.v1();
	}},
	name: {type: String, required: true},
	description: {type: String, required: false},
	price: {type: String, required: false},
	photolinks: {type: [String], required: false},
	allergens: {type: String, required: false},
	advance_booking_time: {type: Number, required: false},
	is_show_or_cooking_recipe_shared: {type: Boolean, required: false, default: false}
});

var AllaKarteSchema = new Schema({
	allakarte_id: {type: String, default: function getUUID(){
		return UUID.v1();
	}},
	dish_items: {type: [DishItemSchema], required: false},
	user_id: {type: String, ref: User.UserSchema, required: true}
});

AllaKarteSchema.statics.FindByUserId = function(UserId, Callback) {
	this.findOne({user_id: UserId}, function(err, allakarte){
		if(err) {
			Callback(err, null);
		} else if (allakarte) {
			Callback(false, allakarte);
		}
	});
};

AllaKarteSchema.statics.AddToExistingDishes = function(RequestBody, Callback) {
	this.FindByUserId(RequestBody.UserId, function(err, allakarte) {
		if(err) {
			Callback(err, null);
		} else {
			if(allakarte.DishItems) {
				allakarte.DishItems.push(RequestBody.DishItem);
				allakarte.save(function(err){
					if(err) {
						Callback(err, null);
					} else {
						Callback(false, allakarte);
					}
				});
			} else {
				allakarte.DishItems = [RequestBody.DishItem];
				allakarte.save(function(err){
					if(err) {
						Callback(err, null)
					} else {
						Callback(false, allakarte);
					}
				});
			}
		}
	});
};

AllaKarteSchema.statics.EditExistingDishes = function(RequestBody, Callback) {
	this.FindByUserId(RequestBody.UserId, function(err, allakarte){
		if(err) {
			Callback(err, null);
		} else {
			if(allakarte.DishItems) {
				//TODO: We need to access dish items and edit the informatio instead of creating new one
			} else {
				Callback(err, null);
			}
		}
	});
};

AllaKarteSchema.statics.FindByAllakarteId = function(user_id, allakarte_id, callback) {
	this.findOne({$and: [{allakarte_id: allakarte_id}, {user_id: user_id}]}, function(err, allakarte){
		if(err || !allakarte) {
			callback(err, null);
		} else {
			callback(false, allakarte);
		}
	});
};

module.exports = Mongoose.model("AllaKarte", AllaKarteSchema);
module.exports.DishItem = Mongoose.model('DishItem', DishItemSchema);
