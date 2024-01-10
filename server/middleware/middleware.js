const apiKey = "jihad";

function authApiKey(req, res, next) {
  const providedKey = req.headers.authorization;

  if (providedKey == apiKey) {
    next();
  } else {
    res.status(401).json({ error: "Ops you are not authorized" });
  }
}

module.exports = authApiKey;
