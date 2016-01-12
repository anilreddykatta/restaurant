var passport = require('passport');
var express = require('express' );

var AuthHandler = require('./server/handlers/AuthHandler');
var allakarteHandler = require('./server/handlers/AllakarteHandler');
var User = require('./server/models/user');
var Constants = require('./constants');


var ApiRouter = express.Router();
var UserRouter = express.Router({mergeParams: true});
var AllakarteRouter = express.Router({mergeParams: true});
var DishItemRouter = express.Router({mergeParams: true});

AllakarteRouter.use('/:allakarte_id/dishitems', is_authenticated, DishItemRouter);
UserRouter.use('/:user_id/allakartes', is_authenticated, AllakarteRouter);
ApiRouter.use('/api/users/', UserRouter);

//User Routes
UserRouter.get('/google', passport.authenticate('google', {scope: ['email']}), AuthHandler.GoogleSignIn);
UserRouter.get('/google/callback', passport.authenticate('google', {failureRedirect: '/#/login', session: false, scope: 'https://www.googleapis.com/auth/plus.login'}), AuthHandler.GoogleSignInCallback);
UserRouter.get('/facebook', passport.authenticate('facebook', { failureRedirect: '/login',successRedirect : '/welcome', session: false, scope: ['email'] }), AuthHandler.FacebookSignIn);
UserRouter.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', session: false, scope: [] }), AuthHandler.FacebookSignInCallback);
UserRouter.post('/login',passport.authenticate('local', {session: false}), AuthHandler.LocalSignIn);
UserRouter.post('/login/social', AuthHandler.LocalSignInWithSocial);
UserRouter.post('/', AuthHandler.RegisterLocal);


//Allakarte Routes
AllakarteRouter.post('/', allakarteHandler.CreateAllakarte);
AllakarteRouter.get('/', allakarteHandler.GetAllKartes);
AllakarteRouter.get('/:allakarte_id', allakarteHandler.GetAllkarte);
AllakarteRouter.delete('/:allakarte_id', allakarteHandler.DeleteAllakarte);
AllakarteRouter.put('/:allakarte_id', allakarteHandler.UpdateAllakarte);

//DishItemRoutes
DishItemRouter.post('/', allakarteHandler.AddDishItemToExistingAllakarte);
DishItemRouter.get('/', allakarteHandler.GetAllDishItemsForAllkarte);
DishItemRouter.delete('/:dish_item_id', allakarteHandler.DeleteDishItem);
DishItemRouter.put('/:dish_item_id', allakarteHandler.UpdateDishItem);
DishItemRouter.get('/:dish_item_id', allakarteHandler.GetDishItem);



function is_authenticated (req, res, next) {
	if(Constants.IS_AUTHENTICATION_DISABLED_FOR_REST_API_TESTING) {
		if(req.body.token) {
			User.findByUserToken(req.body.token, function(err, user){
				if(err || !user) {
					res.redirect('/#/login');
				} else {
					next();
				}
			})
		} else if (req.params.token) {
			User.findByUserToken(req.params.token, function(err, user){
				if(err || !user) {
					res.status(403)
						.send({'status': false, 'error': 'Auth Error'});
				} else {
					next();
				}
			})
		} else {
			res.status(403)
				.send({'status': false, 'error': 'Auth Error'});
		}
	} else {
		next();
	}
}

module.exports = ApiRouter;

