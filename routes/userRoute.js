import express from 'express';
import { loginRequired, profile, register, signIn } from '../controllers/userController.js';
import User from '../models/userModel.js';

const router = express.Router();

const userRoute = '/user';

router.route('/tasks')
    .post(loginRequired, profile);
router.route('/auth/register')
    .post(register);
router.route('/auth/signin')
    .post(signIn);

/**
 * Get all Users
 */
router.get(userRoute, async (req, res) => {
    try{
        const data = await User.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
});

/**
 * Get User by ID
 */
router.get(`${userRoute}/:id`, async (req, res) => {
    try {
        const data = await User.findById(req.params.id);
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
});

/**
 * Create new User
 */
router.post(userRoute, async (req, res) => {
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
router.delete(`${userRoute}/:id`, async (req, res) => {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
});

export default router;
