/**
 * Created by anilkatta on 1/24/16.
 */


var EventModel = require('./../models/events');
var Utils = require('./../utils/utils');

var EventsHandler = function () {};

EventsHandler.prototype.CreateEvent = function(req, res, next) {
	if(req.body.event) {
		var event = Utils.CreateEventFromJsonData(req.body.event);
		event.save(function(err, event){
			if(err || !event) {
				res.send({success : false, error: err});
			} else {
				res.send({success: true, event: event});
			}
		});
	} else {
		res.send({success: false, error: 'Event information is missing'});
	}
};

EventsHandler.prototype.GetAllEvents = function(req, res, next) {
	if(req.params.user_id) {
		EventModel.FindByHostId(req.params.user_id, function(err, events){
			if(err || !events) {
				res.send({success: false, error: err});
			} else {
				res.send({success: true, events: events});
			}
		});
	} else {
		res.send({success: false, error: 'Host id is missing'});
	}
};

EventsHandler.prototype.GetEventsByDateRange = function(req, res, next) {
	if(req.body.start_date && req.body.end_date) {
		EventModel.FindByDateRange(req.body.start_date, req.body.end_date, function(err, events) {
			if(err || !events) {
				res.send({success: false, error: err});
			} else {
				res.send({success: true, events: events});
			}
		});
	} else {
		res.send({success: false, error: 'Date range is not provided'});
	}
};

EventsHandler.prototype.GetEventsByDate = function(req, res, next) {
	if(req.body.date) {
		EventModel.FindByDate(req.body.date, function(err, events) {
			if(err || !events) {
				res.send({success: false, error: err});
			} else {
				res.send({success: true, events: events});
			}
		});
	} else {
		res.send({success: false, error: 'Date is not provided'});
	}
};

EventsHandler.prototype.DeleteEvent = function (req, res, next) {
	if(req.params.event_id) {
		EventModel.DeleteEvent(req.params.event_id, function(err, event){
			if(err) {
				res.send({success: false, error: err});
			} else {
				res.send({success: true, message: 'Successfully deleted'});
			}
		});
	} else {
		res.send({success: false, error: 'Unable to delete'});
	}
};

EventsHandler.prototype.UpdateEvent = function (req, res, next) {
	if(req.params.event_id && req.body.event) {
		EventModel.FindByEventId(req.params.event_id, function(err, event){
			if(err || !event) {
				res.send({success: false, error: err});
			} else {
				event = Utils.UpdateEventFromJsonData(event, req.body.event);
				event.save(function(err, event){
					if(err || !event) {
						res.send({success: false, error: err});
					} else {
						res.send({success: true, event: event});
					}
				});
			}
		});
	} else {
		res.send({success: false, error: 'Missing event id or data to be updated'});
	}
};

EventsHandler.prototype.GetEventById = function(req, res, next) {
	if(req.params.event_id) {
		EventModel.FindByEventId(req.params.event_id, function(err, event){
			if(err || !event) {
				res.send({success: false, error: err});
			} else {
				res.send({success: true, event: event});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Missing Event Id'});
	}
};

module.exports = new EventsHandler();
