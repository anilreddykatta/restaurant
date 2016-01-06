/**
 * Created by anilkatta on 1/5/16.
 */
var Mongoose = requires("mongoose");
var Schema = Mongoose.Schema;
var Model = Mongoose.model;
var UserSchema = requires("user" ).UserSchema;

var HostingStyleSchema = new Schema({
	HostStyle : {type: String, required: false},
	HostStyleDescription : {type: String, required: false}
});

var HostingTagSchema = new Schema({
	HostingTagName : {type: String, required: false},
	HostingTagDescription : {type: String, required: false}
});

var AddressSchema = new Schema({
	City: {type: String, required: false},
	State: {type: String, required: false},
	Country: {type: String, required: false},
	PinCode: {type: String, required: false},
	Address : {type: String, required: false}
});

var BankDetailsSchema = new Schema({
	IsPrimary: {type: Boolean, required: false}
});

var PaypalDetailsSchema = new Schema({
	IsPrimary: {type: Boolean, required: false}
});

var HostingAccessibilitySchema = new Schema({
	HostingAccessibility: {type: String, required: false},
	HostingAccessibilityDescription: {type: String, required: false}
});

var HostingFoodPreferencesSchema = new Schema({
	FoodPreference: {type: String, required: false},
	FoodPreferenceDescription: {type: String, required: false}
});

var DishDetailsSchema = new Schema({
	DishName: {type: String, required: false},
	DishDescription: {type: String, required: false},
	DishPrice: {type: Number, required: false},
	DishPhotoLinks: {type: [String], required: false},
	DishAdvanceBookingTime: {type: Number, required: false},
	DishAllergens: {type: [String], required: false },
	IsShowOrCookingRecipeShared: {type: Boolean, required: false}
});


var EventSchema = new Schema({
	EventName : {type: String, required: false},
	EventVenue : {type: Schema.ObjectId, ref: AddressSchema, required: false},
	MaxNumberOfGuests : {type: Number, required: false},
	MinNumberOfGuests: {type: Number, required: false},
	ExpectedNumberOfGuests: {type: Number, required: false},
	EventPrice: {type: Number, required: false},
	EventDate: {type: Date, required: false},
	EventDishDetails: {type: [DishDetailsSchema], required: false},
	EventPhotoLinks: {type: [String], required: false}
});


var HostSchema = UserSchema.extend({
	Message: {type: [String], required: false},
	BankDetails: {type: [BankDetailsSchema], required: false},
	PayPalDetails: {type: [PaypalDetailsSchema], required: false},
	MaximumNumberOfGuests: {type: Number, required: false},
	AreBioProducts: {type: String, required: false},
	HostingDiskDetails: {type: [String], required: false},
	HostingStyle: {type:[HostingStyleSchema], required: false},
	HostingTag: {type: [HostingTagSchema], required: false},
	HostingDiskDetails: {type: [DishDetailsSchema], required: false},
	HostingAccessibility: {type: [HostingStyleSchema], required: false},
	HostingFoodPreferences: {type: [HostingFoodPreferencesSchema], required: false},
	Events: {type: [EventSchema], required: false}
}, {discriminatorKey: '_type'});

module.exports = Model('Host', HostSchema);
