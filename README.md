
# NODEJS-BOILERPLATE
A nodejs boilerplate, so that we can understand each other. this project was created in order to make sure that our back-end developers understand what they say and reduce confusions in our work space :/

 - Production ready setup
 - Custom  built-in methods and modules for faster development
 - Live reload and Full ES6 support and configuration
 - Built-in unit testing methods
 - Fully integrated with mongoose
 - Basic sample api routes with express
 - custom logging and middlewares for express
 - Custom  global data validators

## SETTING UP FOR DEVELOPMENT
after cloning the repository, run `npm i` or `yarn` to install the packages.
for running the project you can run both commands `npm start` or `npm run dev`., they both do the same thing so it's not so different anyway.
Don't forget to change the project name inside `package.json` .

## WHAT GOING ON UNDER THE HOOD?
nodejs-boilerplate uses backpack for building and bundling your es6 code and live reloading, which is easily configurable with the existing `.babelrc` in project root.
project uses express to run the web servers and uses mongoose for setting up mongodb inside the project.

## GETTING STARTED

### ENVIRONMENTAL VARIABLES
env files will be used for holding some of our static configuration data.
for development purposes use `.dev.env` , the existing variables are:

 1. `DB_HOST` which is the host domain for your mongodb url, default is `localhost`
 2. `DB_PORT` is your mongodb port, default is `27017`
 3. `DB_NAME` is your database name, default is `DUMMY_NAME_DEV`
 4. `DB_USERNAME` remote database username
 5. `DB_PASSWORD` remote database password
 6. `JWT_SECRET` jsonwebtoken hashing secret key, default is `SECRET`
 7. `API_PORT` your express web server listens on this port, default is `3000`
and for production use `.env`, boilerplate itself uses the related .env file based on the command you use, if it contains `--production` it'll use .env if not .dev.env will be used.

### MIDDLEWARES
there are multiple built in middlewares mounted on express's request and response.

 1. `req.validate([])` which takes in an array of strings, what is actually does is it checks if the given strings exist inside your `req.body`, if they don't exist it sends a response with the status code `400`.
 2. `res.validSend(statusCode, data)` , used for sending responses back to the client and logs your status and data.  *NOTE: console.log is disabled in production mode*.
 3. `Auth` which performs authentication on your jwt, you can import it where ever you want in your routes as a middleware, it's located in `/src/app/middlewares/Auth.js`.
 4. `CORS` is handled by default in middlewares but you can customized it `/src/app/middlewares/CORS.js`
