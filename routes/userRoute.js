import express from 'express';
import { loginRequired, profile } from '../controllers/authController.js';
import { all, oneById } from '../controllers/userController.js';
import User from '../models/userModel.js';

const userRoute = express.Router();

const route = (routeUrl) => userRoute.route(routeUrl);

userRoute.route('/tasks')
    .post(loginRequired, profile);


route("").get(all);
route(`/:id`).get(oneById);

/**
 * Create new User
 */
userRoute.post("", async (req, res) => {
    const data = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
});

/**
 * Delete User by ID
 */
userRoute.delete(`/:id`, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

export default userRoute;
