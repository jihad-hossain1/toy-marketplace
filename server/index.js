require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");
const tasksRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");
const secureRoute = require("./routes/secureRoute");
const commentsRoute = require("./routes/commentsRoute");
const productRoute = require("./routes/productRoute");
const reviewRoute = require("./routes/reviewRoute");
const blogRoute = require("./routes/blogRoute");
const productCategory = require("./routes/productCategoryRoutes");
const corsOptions = require("./config/cors.options");
const credentials = require("./middleware/credentials");

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cookieParser());

// app.use(credentials);

app.use(
  cors({ credentials: true, origin: true, exposedHeaders: ["Set-Cookie"] })
);
// app.use(
//   cors({
//     origin:  process.env.CORS_ORIGIN,
//     credentials: true,
//     // origin: "http://localhost:3000",
//   })
// );

app.use(express.json());

connectDB();

// app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// app.use(express.static("public"));

app.use("/api", tasksRoute);
app.use("/api", userRoute);
app.use("/api", secureRoute);
app.use("/api", commentsRoute);
app.use("/api", productRoute);
app.use("/api", reviewRoute);
app.use("/api", blogRoute);
app.use("/api", productCategory);

app.get("/", (req, res) => {
  res.send("api runing");
});

app.listen(5000, console.log(`server run on port ${PORT}`));
