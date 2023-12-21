
import express from 'express';
import { register, signIn } from '../controllers/authController.js';

const authRoute = express.Router();

const route = (routeUrl) => authRoute.route(routeUrl);

route('/register').post(register);
route('/signin')  .post(signIn);

export default authRoute;
