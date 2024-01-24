const express = require("express");
const dotenv = require("dotenv");
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
const corsOptions = require("./config/cors.options");
const credentials = require("./middleware/credentials");

dotenv.config();

connectDB();

const app = express();

app.use(cookieParser());

app.use(credentials);

app.use(cors(corsOptions));
// app.use(
//   cors({
//     origin: originOption || process.env.CORS_ORIGIN,
//     credentials: true,
//     // origin: "http://localhost:3000",
//   })
// );
app.use(express.json());

app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use(express.static("public"));

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
