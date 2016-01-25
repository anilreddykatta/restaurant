var passport = require('passport');
var express = require('express' );

//Handlers
var AuthHandler = require('./server/handlers/AuthHandler');
var AllakarteHandler = require('./server/handlers/AllakarteHandler');
var EventHandler = require('./server/handlers/EventsHandler');

//Models
var User = require('./server/models/user');
var Constants = require('./constants');

//Routers
var ApiRouter = express.Router();
var UserRouter = express.Router({mergeParams: true});
var AllakarteRouter = express.Router({mergeParams: true});
var DishItemRouter = express.Router({mergeParams: true});
var EventRouter = express.Router({mergeParams: true});

AllakarteRouter.use('/:allakarte_id/dish_items', is_authenticated, DishItemRouter);
UserRouter.use('/:user_id/allakartes', is_authenticated, AllakarteRouter);
UserRouter.use('/:user_id/events', is_authenticated, EventRouter);
ApiRouter.use('/api/users/', UserRouter);

//User Routes
UserRouter.get('/google', passport.authenticate('google', {scope: ['email']}), AuthHandler.GoogleSignIn);
UserRouter.get('/google/callback', passport.authenticate('google', {failureRedirect: '/#/login', session: false, scope: 'https://www.googleapis.com/auth/plus.login'}), AuthHandler.GoogleSignInCallback);
UserRouter.get('/facebook', passport.authenticate('facebook', { failureRedirect: '/login',successRedirect : '/welcome', session: false, scope: ['email'] }), AuthHandler.FacebookSignIn);
UserRouter.get('/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login', session: false, scope: [] }), AuthHandler.FacebookSignInCallback);
UserRouter.post('/login',passport.authenticate('local', {session: false}), AuthHandler.LocalSignIn);
UserRouter.post('/login/social', AuthHandler.LocalSignInWithSocial);
UserRouter.post('/', AuthHandler.RegisterLocal);
UserRouter.post('/:user_id/login', AuthHandler.LoginWithToken);
UserRouter.post('/login/changepassword', AuthHandler.ChangePassword);
UserRouter.post('/login/resetpassword', AuthHandler.ResetPassword);


//Allakarte Routes
AllakarteRouter.post('/', AllakarteHandler.CreateAllakarte);
AllakarteRouter.get('/', AllakarteHandler.GetAllKartes);
AllakarteRouter.get('/:allakarte_id', AllakarteHandler.GetAllkarte);
AllakarteRouter.delete('/:allakarte_id', AllakarteHandler.DeleteAllakarte);
AllakarteRouter.put('/:allakarte_id', AllakarteHandler.UpdateAllakarte);

//DishItemRoutes
DishItemRouter.post('/', AllakarteHandler.AddDishItemToExistingAllakarte);
DishItemRouter.get('/', AllakarteHandler.GetAllDishItemsForAllkarte);
DishItemRouter.get('/name/', AllakarteHandler.GetAllDishItemsMatchingSearchString);
DishItemRouter.get('/name/:search_string', AllakarteHandler.GetAllDishItemsMatchingSearchString);
DishItemRouter.delete('/:dish_item_id', AllakarteHandler.DeleteDishItem);
DishItemRouter.put('/:dish_item_id', AllakarteHandler.UpdateDishItem);
DishItemRouter.get('/:dish_item_id', AllakarteHandler.GetDishItem);

//EventRoutes
EventRouter.get('/', EventHandler.GetAllEvents);
EventRouter.post('/', EventHandler.CreateEvent);
EventRouter.get('/:event_id', EventHandler.GetEventById);
EventRouter.get('/date_range', EventHandler.GetEventsByDateRange);
EventRouter.get('/date', EventHandler.GetEventsByDate);
EventRouter.delete('/:event_id', EventHandler.DeleteEvent);
EventRouter.put('/:event_id', EventHandler.UpdateEvent);

function is_authenticated (req, res, next) {
	if(Constants.IS_AUTHENTICATION_DISABLED_FOR_REST_API_TESTING) {
		var token = null;//req.body.token || req.query.token || req.headers['x-access-token'];
		if(req.body.token) {
			token = req.body.token;
		} else if(req.query.token) {
			token = req.query.token;
		} else if(req.params.token) {
			token = req.params.token;
		} else if(req.headers['x-access-token']) {
			token = req.headers['x-access-token'];
		}

		var user_id = null;

		if(req.body.user_id) {
			user_id = req.body.user_id;
		} else if(req.query.user_id) {
			user_id = req.query.user_id;
		} else if(req.params.user_id) {
			user_id = req.params.user_id;
		} else if(req.headers['x-user-id']) {
			user_id = req.headers['x-user-id'];
		}

		if(token && user_id) {
			User.FindByUserIdAndToken(user_id, token, function(err, user){
				if(err || !user) {
					res.redirect('/#/login');
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

