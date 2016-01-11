/**
 * Created by anilkatta on 1/9/16.
 */
var Allakarte = require("./../models/allakarte");
var User = require("./../models/user");
var AllakarteUtils = require('./../utils/AllakarteHandlerUtils');

var AllakarteHandler = function(){};

AllakarteHandler.prototype.CreateAllakarte = function(req, res, next) {
	if(req.params.user_id) {
		User.findByUserId(req.params.user_id, function(err, user){
			if(err) {
				res.send({'success': false, 'error': 'Error in finding the user'});
			} else {
				var userId = user.user_id;
				var allakarte = new Allakarte();
				allakarte.user_id = userId;
				allakarte.dish_items = [];
				allakarte.save(function(err, allakarte){
					if(err) {
						res.send({'error': err, 'success': false});
					} else {
						res.send({'success': true, 'allakarte': allakarte});
					}
				});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.AddDishItemToExistingAllakarte = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id) {
		Allakarte.FindByAllakarteId(req.params.user_id, req.params.allakarte_id, function(err, allakarte){
			if(!allakarte.dish_items) {
				allakarte.dish_items = [];
			}
			var dish_item = AllakarteUtils.CreateDishItemFromRequestBody(req.body);
			allakarte.dish_items.push(dish_item);
			allakarte.save(function(err, allakarte){
				if(err) {
					res.send({'error': err, 'status': false});
				} else {
					res.send({'success': true, 'dish_items': allakarte.dish_items});
				}
			});
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.GetAllDishItemsForAllkarte = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id) {
		Allakarte.FindByAllakarteId(req.params.user_id, req.params.allakarte_id, function(err, allakarte){
			if(err || !allakarte || !allakarte.dish_items) {
				res.send({'sucess': false, 'error': err});
			} else {
				res.send({'sucess': true, 'dish_items': allakarte.dish_items});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.GetAllkarte = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id) {
		Allakarte.FindByAllakarteId(req.params.user_id, req.params.allakarte_id, function(err, allakarte){
			if(err || !allakarte) {
				res.send({'sucess': false, 'error': err});
			} else {
				res.send({'sucess': true, 'allakarte': allakarte});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.GetAllKartes = function(req, res, next) {
	if(req.params.user_id) {
		Allakarte.FindByUserId(req.params.user_id, function(err, allakartes) {
			if(err || !allakartes) {
				res.send({'sucess': false, 'error': err});
			} else {
				res.send({'sucess': true, 'allakartes': allakartes});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.UpdateDishItem = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id && req.params.dish_item_id) {
		//TODO: We need to implement a way to update dish item which is a sub document of allakarte
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.DeleteDishItem = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id && req.params.dish_item_id) {
		Allakarte.DeleteDishItemFromAllakarte(req.params.allakarte_id, req.params.dish_item_id, function(err, allakarte){
			if(err || !allakarte) {
				res.send({'sucess': false, 'error': err});
			} else {
				res.send({'sucess': true, 'allakarte': allakarte});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.DeleteAllakarte = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id) {
		Allakarte.DeleteAllakarte(req.params.allakarte_id, function(err, result){
			if(err == false) {
				res.send({'sucess': true});
			} else {
				res.send({'sucess': false});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.UpdateAllakarte = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id) {
		Allakarte.FindByAllakarteId(req.params.user_id, req.params.allakarte_id, function(err, allakarte) {
			if(req.body.dish_items) {
				allakarte.dish_items = req.body.dish_items;
				allakarte.save(function(err, allakarte){
					if(err || !allakarte) {
						res.send({'sucess': true, 'allakarte': allakarte});
					}
				});
				res.send({'sucess': true, 'allakarte': allakarte});
			} else {
				res.send({'sucess': false, 'error': 'Nothing to update'});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

module.exports = new AllakarteHandler();
