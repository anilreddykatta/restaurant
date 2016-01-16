/**
 * Created by anilkatta on 1/9
 **/

var Mongoose = require("mongoose");
var Schema = Mongoose.Schema;
var User = require("./user");
var UUID = require("node-uuid");
var Photo = require("./photo");
var AllakarteUtils = require("./../utils/AllakarteHandlerUtils");

var DishItemSchema = new Schema({
	dish_item_id: {type: String, default: function getUUID(){
		return UUID.v1();
	}},
	name: {type: String, required: true},
	description: {type: String, required: false},
	price: {type: String, required: false},
	photo_links: {type: [Photo], required: false},
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
	this.findOne( {'dish_items.dish_item_id' : dish_item_id}, function(err, dish_item){
		if(err || !dish_item) {
			callback(err, null);
		} else {
			callback(false, dish_item);
		}
	});
};

AllaKarteSchema.statics.DeleteDishItemFromAllakarte = function(allakarte_id, dish_item_id, callback) {
	this.findOne({allakarte_id: allakarte_id}, function(err, allakarte){
		if(err || !allakarte || !allakarte.dish_items) {
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

AllaKarteSchema.statics.UpdateDishItem = function(allkarte_id, dish_item_id, p_dish_item, callback) {
	this.findOne({allakarte_id : allkarte_id}, function(err, allakarte){
		if(err || !allakarte || !allakarte.dish_items) {
			callback(err, null);
		} else {
			var found_value = false;
			for(var index = 0; index < allakarte.dish_items.length; index++) {
				var dish_item = allakarte.dish_items[index];
				if(dish_item.dish_item_id == dish_item_id) {
					found_value = true;
					AllakarteUtils.UpdateOneModalFromJSONData(allakarte.dish_items[index], p_dish_item);
					allakarte.save(function(err, allakarte){
						if(err || !allakarte) {
							callback(false, null);
						} else {
							callback(err, allakarte);
						}
					});
				}
			}
			if(!found_value) {
				callback(false, allakarte);
			}
		}
	});
};

module.exports.DishItem = Mongoose.model('DishItem', DishItemSchema);
module.exports = Mongoose.model("AllaKarte", AllaKarteSchema);
