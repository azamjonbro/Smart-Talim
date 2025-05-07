const jwt = require('jsonwebtoken');
const SuperAdmin = require('../modules/superadmin/superadmin.model');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Token required" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const superAdmin = await SuperAdmin.findById(decoded.id);

        if (!superAdmin) return res.status(401).json({ message: "Unauthorized" });

        req.user = superAdmin; // SHU yerda req.user paydo bo'ladi
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid or expired token", error });
    }
};

module.exports = authMiddleware;
