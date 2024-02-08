require("dotenv").config();
const app = require("./app");
const connectDatabase = require("./config/db");

connectDatabase()
  .then(() => {
    app.listen(process.env.PORT || 7000, () => {
      console.log(`server is run on port: ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log("connect failed!!!", error));
