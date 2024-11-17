const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1];
        if (!token){
            throw new Error("Unauthorized");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded){
            throw new Error("Unauthorized");
        }

        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({success: false, message: err.message});
    }
}

module.exports = authenticate;