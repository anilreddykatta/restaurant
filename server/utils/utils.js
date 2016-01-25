/**
 * Created by anilkatta on 1/24/16.
 */

var Event = require('./../models/events');
var Utils = function() {};

Utils.prototype.ParseDate = function(date_string) {
	return new Date();
};

Utils.prototype.UpdateEventFromJsonData = function(event, jsonData) {
	event.title = jsonData.title;
	event.description = jsonData.description;
	event.listing_type = jsonData.listing_type;
	event.cuisine_type = jsonData.cuisine_type;
	event.menu_items = jsonData.menu_items;
	event.allergens = jsonData.allergens;
	event.event_photos = jsonData.event_photos;
	event.time_of_event = jsonData.time_of_event;
	event.repeat_frequency = jsonData.repeat_frequency;
	event.duration_of_event = jsonData.duration_of_event;
	event.advance_booking_time = jsonData.advance_booking_time;
	event.price_for_each_adult = jsonData.price_for_each_adult;
	event.price_for_each_child = jsonData.price_for_each_child;
	event.max_number_of_guests = jsonData.max_number_of_guests;
	event.will_host_eat_with_guests = jsonData.will_host_eat_with_guests;
	event.co_hosts = jsonData.co_hosts;
	event.primary_host = jsonData.primary_host;
	return event;
};

Utils.prototype.CreateEventFromJsonData = function(jsonData) {
	var event = new Event();
	event.title = jsonData.title;
	event.description = jsonData.description;
	event.listing_type = jsonData.listing_type;
	event.cuisine_type = jsonData.cuisine_type;
	event.menu_items = jsonData.menu_items;
	event.allergens = jsonData.allergens;
	event.event_photos = jsonData.event_photos;
	event.time_of_event = jsonData.time_of_event;
	event.repeat_frequency = jsonData.repeat_frequency;
	event.duration_of_event = jsonData.duration_of_event;
	event.advance_booking_time = jsonData.advance_booking_time;
	event.price_for_each_adult = jsonData.price_for_each_adult;
	event.price_for_each_child = jsonData.price_for_each_child;
	event.max_number_of_guests = jsonData.max_number_of_guests;
	event.will_host_eat_with_guests = jsonData.will_host_eat_with_guests;
	event.co_hosts = jsonData.co_hosts;
	event.primary_host = jsonData.primary_host;
	return event;
};


module.exports = new Utils();
