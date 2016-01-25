/**
 * Created by anilkatta on 1/24/16.
 */

var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;
var Photo = require('./photo');
var Host = require('./host');
var UUID = require('node-uuid');
var Utils = require('./../utils/utils');

var EventSchema = new Schema({
	event_id : {type: String, default: function getUUID(){
		return UUID.v1();
	}},
	title : {type: String, required: true},
	description: {type: String, required: false},
	listing_type: {type: String, required: false},
	cuisine_type: {type: String, required: false},
	menu_items : {type: String, required: false},
	allergens: {type: String, required: false},
	event_photos: {type: [Photo.PhotoSchema], required: false},
	time_of_event: {type: Date, required: true},
	repeat_frequency: {type: String, required: false},
	duration_of_event: {type: Number, required: false},
	advance_booking_time: {type: Number, required: false},
	price_for_each_adult: {type: Number, required: false},
	price_for_each_child: {type: Number, required: false},
	max_number_of_guests: {type: Number, required: false},
	will_host_eat_with_guests: {type: Boolean, required: false},
	co_hosts: {type: [Host.HostSchema], required: false},
	primary_host: {type: Schema.ObjectId, ref: Host.HostSchema, required: true}
});


EventSchema.statics.FindByHostId = function(host_id, callback) {
	this.findOne({primary_host: host_id}, function(err, events){
		if(err || !event) {
			callback(err, null);
		} else {
			callback(false, events);
		}
	});
};

EventSchema.statics.FindByEventId = function(event_id, callback) {
	this.findOne({event_id: event_id}, function(err, event){
		if(err || !event) {
			callback(err, null);
		} else {
			callback(false, event);
		}
	});
};

EventSchema.statics.FindByDate = function(date_of_interest, callback) {
	this.find({'$where': 'time_of_event.toJSON().slice(0, 10) == "'+date_of_interest+'"'}, function(err, events){
		if(err || !events) {
			callback(err, null);
		} else {
			callback(false, events);
		}
	});
};

EventSchema.statics.FindByDateRange = function(start_date, end_date, callback) {
	this.find({'time_of_event': {'$gte': Utils.ParseDate(start_date), '$lte': Utils.ParseDate(end_date)}}, function(err, events){
		if(err || !events) {
			callback(err, null);
		} else {
			callback(false, events);
		}
	});
};

EventSchema.statics.DeleteEvent = function(event_id, callback) {
	this.remove({event_id: event_id}, function(err){
		if(err) {
			callback(err, null);
		} else {
			callback(false, null);
		}
	})
};


module.exports = Mongoose.model('Event', EventSchema);
