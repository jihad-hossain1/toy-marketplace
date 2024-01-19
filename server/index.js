const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");
const tasksRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");
const secureRoute = require("./routes/secureRoute");
const commentsRoute = require("./routes/commentsRoute");
const productRoute = require("./routes/productRoute");
const reviewRoute = require("./routes/reviewRoute");
const blogRoute = require("./routes/blogRoute");

dotenv.config();
connectDB();
const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("api runing");
});

app.use("/api", tasksRoute);
app.use("/api", userRoute);
app.use("/api", secureRoute);
app.use("/api", commentsRoute);
app.use("/api", productRoute);
app.use("/api", reviewRoute);
app.use("/api", blogRoute);

const PORT = process.env.PORT || 5000;
app.listen(5000, console.log(`server run on port ${PORT}`));
