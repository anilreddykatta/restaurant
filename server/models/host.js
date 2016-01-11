/**
 * Created by anilkatta on 1/5/16.
 */
var Mongoose = requires("mongoose");
var Schema = Mongoose.Schema;
var Model = Mongoose.model;
var UserSchema = requires("user" ).UserSchema;

var HostingStyleSchema = new Schema({
	host_style : {type: String, required: false},
	host_style_description : {type: String, required: false}
});

var HostingTagSchema = new Schema({
	hosting_tag_name : {type: String, required: false},
	hosting_tag_description : {type: String, required: false}
});

var AddressSchema = new Schema({
	city: {type: String, required: false},
	state: {type: String, required: false},
	country: {type: String, required: false},
	pin_code: {type: String, required: false},
	address : {type: String, required: false}
});

var BankDetailsSchema = new Schema({
	is_primary: {type: Boolean, required: false}
});

var PaypalDetailsSchema = new Schema({
	is_primary: {type: Boolean, required: false}
});

var HostingAccessibilitySchema = new Schema({
	hosting_accessibility: {type: String, required: false},
	hosting_accessbility_description: {type: String, required: false}
});

var HostingFoodPreferencesSchema = new Schema({
	food_preference: {type: String, required: false},
	food_preference_description: {type: String, required: false}
});

var DishDetailsSchema = new Schema({
	dish_name: {type: String, required: false},
	dish_description: {type: String, required: false},
	dish_price: {type: Number, required: false},
	dish_photo_links: {type: [String], required: false},
	dish_advance_booking_time: {type: Number, required: false},
	dish_allergens: {type: [String], required: false },
	is_show_or_cooking_recipe_shared: {type: Boolean, required: false}
});


var EventSchema = new Schema({
	event_name : {type: String, required: false},
	even_venue : {type: Schema.ObjectId, ref: AddressSchema, required: false},
	max_number_of_guests : {type: Number, required: false},
	min_number_of_guests: {type: Number, required: false},
	expected_number_of_guests: {type: Number, required: false},
	event_price: {type: Number, required: false},
	event_date: {type: Date, required: false},
	event_dish_details: {type: [DishDetailsSchema], required: false},
	event_photo_links: {type: [String], required: false}
});


var HostSchema = UserSchema.extend({
	message: {type: [String], required: false},
	bank_details: {type: [BankDetailsSchema], required: false},
	paypal_details: {type: [PaypalDetailsSchema], required: false},
	max_number_of_guests: {type: Number, required: false},
	are_bio_products: {type: String, required: false},
	hosting_styles: {type:[HostingStyleSchema], required: false},
	hosting_tags: {type: [HostingTagSchema], required: false},
	hosting_dish_details: {type: [DishDetailsSchema], required: false},
	hosting_accessibilities: {type: [HostingStyleSchema], required: false},
	hosting_food_preferences: {type: [HostingFoodPreferencesSchema], required: false},
	events: {type: [EventSchema], required: false}
}, {discriminatorKey: '_type'});

module.exports = Model('Host', HostSchema);
