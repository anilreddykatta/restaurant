/**
 * Created by anilkatta on 1/9/16.
 */
var Allakarte = require("./../models/allakarte");
var User = require("./../models/user");
var AllakarteUtils = require('./../utils/AllakarteHandlerUtils');

var AllakarteHandler = function() {
	this.CreateAllaKarte = CreateAllakarte;
	this.AddDishItemToExistingAllakarte = AddDishItemToExistingAllakarte;
};

function CreateAllakarte(req, res, next) {
	console.log(req.body);
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
}

function AddDishItemToExistingAllakarte(req, res, next) {
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
					res.send({'success': true, 'allakarte': allakarte});
				}
			});
		});
	} else {
		res.send({'success': false, 'error': 'Please send information to create records'});
	}
}

module.exports = new AllakarteHandler();
