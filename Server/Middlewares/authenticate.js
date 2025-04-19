const jwt = require("jsonwebtoken");

const users = require("../Models/userModel")
const keysecret = process.env.SECRET_KEY


const authenticate = async (req, res, next) => {

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ status: 401, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];

        const verifytoken = jwt.verify(token, keysecret);

        const rootUser = await users.findOne({ _id: verifytoken._id });

        if (!rootUser) { throw new Error("user not found") }

        req.token = token
        req.rootUser = rootUser
        req.userId = rootUser._id

        next();

    } catch (error) {
        res.status(401).json({ status: 401, message: "Unauthorized no token provide" })
    }
}


module.exports = authenticate;