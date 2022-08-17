const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();

// Load env variables
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());

// Importing routes
const userRoute = require("./routes/user.route");

// Using routes
app.use("/api/user", userRoute);
// so the url is /api/user/register - for register
// so the url is /api/user/login - for login

// DB Connection
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

// Server Initiation
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
