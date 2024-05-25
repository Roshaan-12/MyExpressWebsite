const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token == null) return res.status(401).send('Token required');

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.status(403).send('Invalid token');
        req.user = user;
        next();
    });
};

module.exports = authenticateToken;
