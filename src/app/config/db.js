/**
 *          .::DATABASE CONFIGURATION::.
 * Connecting to Mongo Server and Database Configuration
 * 
 */
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const {
	DB_USERNAME,
	DB_PASSWORD,
	DB_HOST,
	DB_PORT,
	DB_NAME
} = process.env;

const mongoOptions = {
    useNewUrlParser: true
};

//GENERATING MONGODB URI
var loginInfo = "";
var authSource = "";
if (DB_USERNAME) {
	loginInfo = DB_USERNAME + ":" + DB_PASSWORD + "@";
	authSource = "?authSource=" + DB_AUTHSOURCE;
}
var uri = "mongodb://" + loginInfo + DB_HOST + ":" + DB_PORT + "/" + DB_NAME + authSource;

//CONNECTING TO MONGODB SERVER
mongoose.connect(uri, mongoOptions);
const db = mongoose.connection;

//LOGS
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to mongo server.'));