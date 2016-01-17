var express = require('express')
	,routes = require('./routes')
	,UserHandler = require('./server/handlers/UserHandler')
	,AuthHandler = require('./server/handlers/AuthHandler')
	,passport = require('passport')
	,mongoose = require('mongoose')
	,session = require('express-session')
	,LocalStrategy = require('passport-local').Strategy
	,GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
	,FacebookStrategy = require('passport-facebook').Strategy
	,Constants = require('./constants' )
	,User = require('./server/models/user' )
	,BodyParser = require("body-parser")
	,ExpressLogger = require("morgan")
	,UrlEncode = require("urlencode")
	,MethodOverride = require("method-override")
	,CookieParser = require("cookie-parser")
	,Errorhandler = require("errorhandler");


var app = express();

app.set('client-url','http://localhost:8000');
app.set('client-google-signin','/google?action=signin');
app.disable('x-powered-by');
app.use(ExpressLogger("dev"));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({extended: false}));
app.use(MethodOverride());
app.use(session({
	secret:'allcarte secret'
}));
app.use(CookieParser());
app.use(passport.initialize());
app.use(passport.session());

//User profile for authentication
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', routes);
app.use(express.static(__dirname + '/'));
app.use(function(req, res, next){allowCrossDomain(req, res, next);});

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', Constants.DEV_DOMAIN);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if ('OPTIONS' == req.method) {
    	res.send(200);
    }
    else {
    	next();
    }
};

mongoose.connect(Constants.MONGO_DB_URI, function (error) {
    if (error) console.error(error);
    else console.log('mongo connected ..................................');
});


app.use(Errorhandler({dumpExceptions: true, showStack: true}));
console.log("Starting in development mode");


passport.use('google', new GoogleStrategy({
		clientID: Constants.GOOGLE_AUTH.GOOGLE_CLIENT_ID,
		clientSecret: Constants.GOOGLE_AUTH.GOOGLE_SECRET_KEY,
		callbackURL: Constants.DEV_DOMAIN + Constants.GOOGLE_AUTH.GOOGLE_CALLBACK_URL
  	},
	function(accessToken, refreshToken, profile, done) {
		process.nextTick(function () {
			User.findUserByEmailId(profile.emails[0 ].value, function(err, usr){
				if(err)
					return done(err);
				if(usr) {
					return done(null, usr);
				} else {
					var UserToBeSaved = new User();
					UserToBeSaved.google_profile_id = profile.id;
					UserToBeSaved.access_token = accessToken;
					UserToBeSaved.token = User.Token({token: accessToken});
					UserToBeSaved.name = profile.name.givenName +' '+ profile.name.familyName;
					UserToBeSaved.email = profile.emails[0].value;
					UserToBeSaved.role = 'guest';
					UserToBeSaved.save(function(err){
						if(err)
							throw err;
						return done(null, UserToBeSaved);
					});
				}
			});
		});
	}
));

passport.use('facebook', new FacebookStrategy({
			clientID: Constants.FACEBOOK_AUTH.FACEBOOK_CLIENT_ID,
			clientSecret: Constants.FACEBOOK_AUTH.FACEBOOK_SECRET_KEY,
			callbackURL: Constants.DEV_DOMAIN + Constants.FACEBOOK_AUTH.FACEBOOK_CALLBACK_URL,
			profileFields: ['id', 'emails', 'name']
		},
		function(accessToken, refreshToken, profile, done) {
			process.nextTick(function () {
				User.findUserByEmailId(profile.emails[0].value, function(err, usr){
					if(err)
						return done(err);
					if(usr) {
						return done(null, usr);
					} else {
						var UserToBeSaved = new User();
						UserToBeSaved.facebook_profile_id = profile.id;
						UserToBeSaved.access_token = accessToken;
						UserToBeSaved.token = User.Token({token: accessToken});
						UserToBeSaved.name = profile.name.givenName +' '+ profile.name.familyName;
						UserToBeSaved.email = profile.emails[0].value;
						UserToBeSaved.role = 'guest';
						UserToBeSaved.save(function(err){
							if(err) {
								throw err;
							}
							return done(null, UserToBeSaved);
						});
					}
				});
			});
		}
));
app.listen(process.env.PORT || 5000);
console.log('Listening on port 5000');


