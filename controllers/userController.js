import User from '../models/userModel.js';

/**
 * Get all Users
 */
export async function all(req, res) {
    try{
        const data = await User.find();
        res.json(data);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

/**
 * Get User by ID
 */
export async function oneById(req, res) {
    try {
        const data = await User.findById(req.params.id);
        res.json(data);
    }
    catch(error) {
        res.status(500).json({message: error.message});
    }
}

/**
 * Create new User
 */
export async function newUser(req, res) {
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
}

/**
 * Delete User by ID
 */
export async function removeOne(req, res) {
    try {
        const id = req.params.id;
        const data = await User.findByIdAndDelete(id);
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}