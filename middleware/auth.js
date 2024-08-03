const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = (role) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '');
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findOne({ _id: decoded._id, role });

            if (!user) {
                throw new Error();
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).send({ error: 'Not authorized' });
        }
    }
}

module.exports = auth;