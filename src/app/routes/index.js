// All Routes get imported here
import express from 'express';
const routes = express.Router();
import users from './users';

routes.use('/users', users);

export default routes;