const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({
            message: "Token required",
        })
    }

    const token = header.split(" ")[1];

    try {
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decode;
        next()
    } catch (error) {
        res.status(403).json({
            message: "Invalid or expired token"
        })
    }
}

module.exports = verifyToken