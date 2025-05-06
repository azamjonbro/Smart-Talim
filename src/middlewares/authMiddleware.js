// src/middlewares/auth.middleware.js
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer token

    if (!token) {
        return res.status(403).json({ message: 'Access denied, no token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // JWTni tekshirish
        req.user = decoded; // Tokenni decode qilib, foydalanuvchi malumotlarini req ga qo‘shish
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

module.exports = authenticate;
