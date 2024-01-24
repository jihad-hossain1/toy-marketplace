const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { asyncHandlerPromise } = require("../utils/asyncHandler");

const verifyJWT = asyncHandlerPromise(async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ error: "unauthorized requiest" });
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) {
      return res.status(401).json({ error: "Invalid access token" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json(error?.message || "invalid access token");
  }
});

module.exports = verifyJWT;
