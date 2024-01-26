import express from 'express';
import { loginRequired, profile } from '../controllers/authController.js';
import { all, newUser, oneById, removeOne } from '../controllers/userController.js';
import User from '../models/userModel.js';

const userRoute = express.Router();

const route = (routeUrl) => userRoute.route(routeUrl);

userRoute.route('/tasks')
    .post(loginRequired, profile);


route("")           .get(all);
route(`/:id`)       .get(oneById);
route("")           .post(newUser);
route(`/:id`)       .delete(removeOne);

export default userRoute;
