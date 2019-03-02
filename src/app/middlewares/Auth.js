import User from '../models/User';
import {
	verify
} from './Token';
//The KEY that has token
const TOKENKEY = "x-access-token"

//API AUTHENTICATION
export default async function auth(req, res, next) {
	//Getting Token
	if (req.headers[TOKENKEY]) var api_token = req.headers[TOKENKEY];
	//TOKENNOTFOUND Handling
	if (!api_token) return res.validSend(401, "The following keys are required in request header: \n " + TOKENKEY + "\n")
	//Verifying token
	var verified = await verify(api_token);
	//Verifying token error handling
	if (verified.error) return res.validSend(401, verified);
	//Adding verified user information to request object.
	_.mapKeys(verified, (value, key) => {
		return req[key] = value;
	});

	next();
}