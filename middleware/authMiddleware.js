const authService = require('../service/authService');

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token || !authService.isTokenValid(token)) {
        return res.status(401).end();
    }

    next();
};

const requireAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        const decodedToken = authService.decodeToken(token);
        req.token = req.session.token;

        if (!decodedToken) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }

        req.user = decodedToken;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Authentication failed.', error: error });
    }
};

const requireRole = (role) => (req, res, next) => {
    let token = req.session.token;
    if (!token || token === '') {
        token = req.headers.authorization?.split(' ')[1];
    }
    if (token) {
        const decodedToken = authService.decodeToken(token);
        if (decodedToken && decodedToken.role === role) {
            next();
        } else {
            res.status(403).json({ message: 'Forbidden.' });
        }
    } else {
        res.status(403).json({ message: 'Forbidden.' });
    }
};

function requireLogin(req, res, next) {
    if (req.session.token) {
      try {
        const decodedToken = authService.decodeToken(req.session.token);
        req.user = decodedToken;
        next();
      } catch (error) {
        console.error(error);
        res.redirect("/login");
      }
    } else {
      res.redirect("/login");
    }
  }

module.exports = {
    authMiddleware,
    requireAuth,
    requireRole,
    requireLogin
};