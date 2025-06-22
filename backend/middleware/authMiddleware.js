import jwt from 'jsonwebtoken';
import User from "../Schemas/authSchemas.js";

const checkAuth = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    console.log(token);
    
    if (!token) {
        return res.status(401).json({ error: 'Authentication token is missing' });
    }

    try {
        const { id } = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(id).select('_id userType');
        if (!user) {
            return res.status(401).json({ error: 'User not found' });
          }
        req.user = user
        console.log(req.user);
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid authentication token' });
    }
}

export default checkAuth;