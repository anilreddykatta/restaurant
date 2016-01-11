/**
 * Created by anilkatta on 1/9
 **/

var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var User = require("./user");
var UUID = require("node-uuid");

var DishItemSchema = new Schema({
	dish_item_id: {type: String, default: function getUUID(){
		return UUID.v1();
	}},
	name: {type: String, required: true},
	description: {type: String, required: false},
	price: {type: String, required: false},
	photo_links: {type: [String], required: false},
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

AllaKarteSchema.statics.FindByUserId = function(user_id, callback) {
	this.find({user_id: user_id}, function(err, allakartes){
		if(err) {
			callback(err, null);
		} else if (allakartes) {
			callback(false, allakartes);
		}
	});
};

AllaKarteSchema.statics.EditExistingDishes = function(request_body, callback) {
	this.FindByUserId(request_body.UserId, function(err, allakarte){
		if(err) {
			callback(err, null);
		} else {
			if(allakarte.DishItems) {
				//TODO: We need to access dish items and edit the informatio instead of creating new one
			} else {
				callback(err, null);
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

AllaKarteSchema.statics.FindByDishItemId = function(dish_item_id, callback) {
	this.findOne( {'dish_items.dish_id' : dish_item_id}, function(err, dish_item){
		if(err || !dish_item) {
			callback(err, null);
		} else {
			callback(false, dish_item);
		}
	});
};

AllaKarteSchema.statics.DeleteDishItemFromAllakarte = function(allakarte_id, dish_item_id, callback) {
	this.findOne({allakarte_id: allakarte_id}, function(err, allakarte){
		if(err || !allakarte) {
			callback(err, null);
		} else {
			for(var index = 0; index < allakarte.dish_items.length; index++) {
				if(allakarte.dish_items[index].dish_item_id == dish_item_id) {
					allakarte.dish_items[index].remove();
					allakarte.save(function(err, allakarte){
						if(err || !allakarte) {
							callback(err, null);
						} else {
							callback(false, allakarte);
						}
					});
				}
			}
			callback(false, allakarte);
		}
	});
};

AllaKarteSchema.statics.DeleteAllakarte = function(allakarte_id, callback) {
	this.remove({allakarte_id : allakarte_id}, function(err){
		if(err) {
			callback(err, null);
		} else {
			callback(false, null);
		}
	});
};

AllaKarteSchema.statics.UpdateDishItem = function(dish_item_id, callback) {
	//TODO: We need to update the dish item which is a subdocument in the allakarte
};

module.exports = Mongoose.model("AllaKarte", AllaKarteSchema);
module.exports.DishItem = Mongoose.model('DishItem', DishItemSchema);
