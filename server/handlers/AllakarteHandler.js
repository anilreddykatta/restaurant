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
			var dish_item = AllakarteUtils.CreateDishItemFromRequestBody(req.body.dish_item);
			allakarte.dish_items.push(dish_item);
			allakarte.save(function(err, allakarte){
				if(err) {
					res.send({'error': err, 'status': false});
				} else {
					res.send({'success': true, 'allakarte': allakarte});
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
				res.send({'success': false, 'error': err});
			} else {
				res.send({'success': true, 'allakarte': allakarte});
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
				res.send({'success': false, 'error': err});
			} else {
				res.send({'success': true, 'allakarte': allakarte});
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
				res.send({'success': false, 'error': err});
			} else {
				res.send({'success': true, 'allakartes': allakartes});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.UpdateDishItem = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id && req.params.dish_item_id) {
		Allakarte.UpdateDishItem(req.params.allakarte_id, req.params.dish_item_id, req.body.dish_item, function(err, allakarte) {
			if(err || !allakarte) {
				res.send({'success' : false, 'error' : err});
			} else {
				res.send({'success': true, 'allakarte': allakarte});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.DeleteDishItem = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id && req.params.dish_item_id) {
		Allakarte.DeleteDishItemFromAllakarte(req.params.allakarte_id, req.params.dish_item_id, function(err, allakarte){
			if(err || !allakarte) {
				res.send({'success': false, 'error': err});
			} else {
				res.send({'success': true, 'allakarte': allakarte});
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
				res.send({'success': true});
			} else {
				res.send({'success': false});
			}
		});
	} else {
		res.status(400);
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
						res.send({'success': true, 'allakarte': allakarte});
					}
				});
				res.send({'success': true, 'allakarte': allakarte});
			} else {
				res.status(400);
				res.send({'success': false, 'error': 'Nothing to update'});
			}
		});
	} else {
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.GetDishItem = function(req, res, next) {
	if(req.params.allakarte_id && req.params.dish_item_id) {
		Allakarte.FindByDishItemId(req.params.dish_item_id, function(err, dish_item){
			if(err || !dish_item) {
				res.send({'success': false, 'error': err});
			} else {
				res.send({'success': true, 'dish_item': dish_item});
			}
		});
	} else {
		res.status(400);
		res.send({'success': false, 'error': 'Not a valid request'});
	}
};

AllakarteHandler.prototype.GetAllDishItemsMatchingSearchString = function(req, res, next) {
	if(req.params.allakarte_id && req.params.user_id) {
		if(req.params.search_string) {
			Allakarte.FindByAllakarteId(req.params.user_id, req.params.allakarte_id, function(err, allakarte){
				if(err || !allakarte) {
					res.send({success: false, error: err});
				} else {
					var dish_items = [];
					for(var index = 0; index < allakarte.dish_items.length; index++) {
						var dish_item = allakarte.dish_items[index];
						if(dish_item.name.toLowerCase().indexOf(req.params.search_string.toLowerCase()) != -1) {
							dish_items.push(dish_item);
						}
					}
					res.send({success: true, dish_items : dish_items});
				}
			});
		} else {
			Allakarte.FindByAllakarteId(req.params.user_id, req.params.allakarte_id, function(err, allakarte){
				if(err || !allakarte) {
					res.send({success: false, error: err});
				} else {
					var dish_items = [];
					for(var index = 0; index < allakarte.dish_items.length; index++) {
						dish_items.push(allakarte.dish_items[index]);
					}
					res.send({success: true, dish_items : dish_items});
				}
			});
		}
	}
};

module.exports = new AllakarteHandler();
