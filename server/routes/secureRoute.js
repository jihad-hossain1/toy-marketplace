const express = require("express");
const authApiKey = require("../middleware/middleware");
const { getTasks } = require("../controller/tasks");
const {
  generateApiKey,
  middlewareExpireApiKeySecret,
} = require("../middleware/middleware_expire_token");

const router = express.Router();

// only fixed apikey set based - no time limition
router.get("/secureUsers", authApiKey, getTasks);

let date = new Date().toLocaleDateString();
let time = new Date().toLocaleTimeString();
const createdAt = `${time} - ${date}`;
// apikey genarator api-route
router.get("/generateApikey", (req, res) => {
  const newApiKey = generateApiKey();
  res.json({
    apiKeyInfo: {
      apiKey: newApiKey,
      createdAt: createdAt,
      expiresIn: "5 minunte ",
    },
  });
});

/*
this api based on api key genarate based --> time limition  
*/
router.get("/secureUsers_time_based", middlewareExpireApiKeySecret, getTasks);

module.exports = router;
