/**
 *          .::USER ROUTES::.
 * All User's apis are routed here.
 * 
 */
import express from 'express';
const routes = express.Router();

import Auth from '../middlewares/Auth';
import {
	register,
	login,
	me
} from '../controllers/UserController'

//ENDPOINTS
routes.post('/register', register);
routes.post('/login', login);
routes.post('/me', Auth, me);



export default routes;