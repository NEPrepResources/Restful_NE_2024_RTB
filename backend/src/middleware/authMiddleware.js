const jwt = require('jsonwebtoken');

exports.protect = async (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized. Token is missing.'
        });
    }

    try {
        token = token.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'migisha@YezuAkuzwe123!');
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        console.error(err);
        return res.status(401).json({
            message: 'Invalid token...'
        });
    }
};