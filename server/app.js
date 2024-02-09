const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = new express();

app.use(
  cors({ credentials: true, origin: true, exposedHeaders: ["Set-Cookie"] })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// route importer

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const reviewRoute = require("./routes/reviewRoute");
const blogRoute = require("./routes/blogRoute");
// const productCategory = require("./routes/productCategoryRoutes");

app.use("/api", userRoute);
app.use("/api", productRoute);
app.use("/api", reviewRoute);
app.use("/api", blogRoute);
// app.use("/api", productCategory);

module.exports = app;
