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