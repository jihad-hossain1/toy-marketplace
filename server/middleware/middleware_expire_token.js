const jwt = require("jsonwebtoken");

const secretKey = "jihad";

const apiKey = "jihad";
const keyExpireTime = 60;

function generateApiKey() {
  const token = jwt.sign({ apiKey }, secretKey, { expiresIn: keyExpireTime });
  return token;
}

function middlewareExpireApiKeySecret(req, res, next) {
  const proivdedToken = req.headers.authorization;

  if (!proivdedToken) {
    return res
      .status(401)
      .json({ error: "ops key are not valid. <--Unauthorized-->" });
  }

  try {
    const decoded = jwt.verify(proivdedToken, secretKey);
    const now = Math.floor(Date.now() / 1000);

    if (decoded.apiKey === apiKey && decoded.exp > now) {
      next();
    } else {
      res.status(401).json({ error: "Ops your token formate are not valid!" });
    }
  } catch (error) {}
}

module.exports = { generateApiKey, middlewareExpireApiKeySecret };
