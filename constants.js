
var GOOGLE_CLIENT_ID = '295902945278-b3oqgi2daricc22mnnem3gca13q0ea12.apps.googleusercontent.com';
var GOOGLE_SECRET_KEY = 'rMT_E9TFqlSC9B497i9WTQS9';
var GOOGLE_CALLBACK_URL = '/api/users/google/callback';

var FACEBOOK_APP_ID = '1086250834720928';
var FACEBOOK_SECRET_KEY = '888f1a92dd4b0341e7b62b21d553704c';
var FACEBOOK_CALLBACK_URL = '/api/users/facebook/callback';

var DEV_DOMAIN = 'http://ec2-52-11-38-198.us-west-2.compute.amazonaws.com:5000';


var TOKEN_SECRET = 'awesomeallakarte';
//for Dev and production
//var MONGO_DB_URI='mongodb://localhost:27017/myproject';
var MONGO_DB_URI='mongodb://alla1:alla1@0.0.0.0:27017/myproject';
//var MONGO_DB_URI='mongodb://heroku_5j1k7dmw:ols1h2mmdeut9nl53i3j8cf466@ds045664.mongolab.com:45664/heroku_5j1k7dmw';

var RESET_TOKEN_IN_HOURS = 6;

var GMAIL_SMTP_EMAIL_ID = 'alacarte4313@gmail.com';
var GMAIL_SMTP_PASSWORD = 'alacarte2015';

var SALT_LEN = 32;
var ITERATIONS = 25000;
var KEY_LENGTH = 512;


module.exports =
{
    GOOGLE_AUTH: {
        GOOGLE_CLIENT_ID : GOOGLE_CLIENT_ID,
        GOOGLE_SECRET_KEY : GOOGLE_SECRET_KEY,
        GOOGLE_CALLBACK_URL : GOOGLE_CALLBACK_URL
    },
    FACEBOOK_AUTH: {
        FACEBOOK_CLIENT_ID : FACEBOOK_APP_ID,
        FACEBOOK_SECRET_KEY : FACEBOOK_SECRET_KEY,
        FACEBOOK_CALLBACK_URL: FACEBOOK_CALLBACK_URL
    },
    GMAIL_SMTP: {
        GMAIL_SMTP_EMAIL_ID : GMAIL_SMTP_EMAIL_ID,
        GMAIL_SMTP_PASSWORD : GMAIL_SMTP_PASSWORD
    },
	CRYPO_SETTINGS : {
		SALT_LEN : SALT_LEN,
		ITERATIONS : ITERATIONS,
		KEY_LENGTH : KEY_LENGTH
	},
    DEV_DOMAIN : DEV_DOMAIN,
    TOKEN_SECRET: TOKEN_SECRET,
    MONGO_DB_URI: MONGO_DB_URI,
    RESET_TOKEN_IN_HOURS: RESET_TOKEN_IN_HOURS,
	IS_AUTHENTICATION_DISABLED_FOR_REST_API_TESTING: true
};
