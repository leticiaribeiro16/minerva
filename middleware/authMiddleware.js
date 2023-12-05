// File: c:\Minerva\middleware\authMiddleware.js
const authService = require('../service/authService');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!authService.isTokenValid(token)) {
        return res.status(401);
    }

    next();
};

module.exports = authMiddleware;