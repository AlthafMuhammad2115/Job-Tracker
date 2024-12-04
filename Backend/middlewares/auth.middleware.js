const jwt = require('jsonwebtoken')
require('dotenv').config()

function UserAuthToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token is required' });
    }

    jwt.verify(token, process.env.JWT_USER_TOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid Token' });
        }

        next();
    });

}

function AdminAuthToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    const token = authHeader && authHeader.split(' ')[1];
    

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Token is required' });
    }

    jwt.verify(token, process.env.JWTTOKEN_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden: Invalid Token' });
        }

        next();
    });

}

module.exports = {UserAuthToken,AdminAuthToken};