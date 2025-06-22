import jwt from 'jsonwebtoken';
import User from "../Schemas/authSchemas";

const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Authentication token is missing' });
    }

    try {
        const { _id } = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findOne({ _id }).select('_id userType'); 
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid authentication token' });
    }
}

export default checkAuth;