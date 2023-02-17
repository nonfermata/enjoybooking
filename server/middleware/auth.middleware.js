const tokenService = require('../services/token.service');
const User = require('../models/User')

const authMiddleware = async (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next();
    }
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const data = tokenService.validateAccess(token);
        if (!data) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const user = await User.findOne({ _id: data._id });
        req.user = { ...data, type: user.type };
        next();
    } catch (e) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware;
