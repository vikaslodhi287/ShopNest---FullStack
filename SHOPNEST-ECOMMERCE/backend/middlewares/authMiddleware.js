const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function protect(req, res, next) {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const decoded = jwt.verify(
                token,
                process.env.JWT_SECRET
            );

            req.user = await userModel
                .findById(decoded.id)
                .select("-password");

            return next();

        } catch (error) {
            console.log(error.message);

            return res.status(401).json({
                message: "Not authorized, token failed"
            });
        }
    }

    return res.status(401).json({
        message: "Not authorized, no token"
    });
}

module.exports = { protect };