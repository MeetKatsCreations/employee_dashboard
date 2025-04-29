const jwt = require("jsonwebtoken");
const users = require("../Models/userModel");
const keysecret = process.env.SECRET_KEY;

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // ✅ FIXED HERE
    if (!token) {
      return res.status(401).json({ status: 401, message: "No token provided" });
    }

    const verifytoken = jwt.verify(token, keysecret);
    const rootUser = await users.findOne({ _id: verifytoken._id });

    if (!rootUser) throw new Error("User not found");

    req.token = token;
    req.rootUser = rootUser;
    req.userId = rootUser._id;
    req.role = rootUser.role;

    next();
  } catch (error) {
    res.status(401).json({ status: 401, message: "Unauthorized, invalid token" });
  }
};

module.exports = authenticate;
