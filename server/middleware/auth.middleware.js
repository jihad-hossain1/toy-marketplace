const JWT = require("jsonwebtoken");
const User = require("../models/User");

const verifyJWT = async (req, res, next) => {
  try {
    const accessToken =
      req.cookies?.accessToken ||
      req.header("Authorization" || "authorization")?.replace("Bearer ", "");

    if (!accessToken) {
      return res.status(401).json({ message: "Unauthorized request" });
    }

    const decodedToken = JWT.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id).select(
      " -password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ error: error?.message, message: "Invalid access token" });
  }
};

module.exports = verifyJWT;
