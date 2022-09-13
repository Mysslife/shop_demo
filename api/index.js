const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const cors = require("cors");

dotenv.config();
app.use(cors());

// Connect DB:
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000, () => {
      console.log("Listening to port 5000!");
      console.log("Connected to the db!");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Middleware:
app.use(express.json());

// Routes:
app.use("/api/auth/", authRoute);
app.use("/api/users/", userRoute);
app.use("/api/products/", productRoute);
app.use("/api/orders/", orderRoute);
app.use("/api/checkout/", stripeRoute);
