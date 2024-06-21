const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./db/db");
const formRoutes = require("./routes/formRoutes");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: [
      "https://dynamic-form-app-u8yt.vercel.app",
      "http://localhost:3000",
    ],
    methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Home Route
app.get("/", (req, res) => {
  res.send("Hi from the backend");
});

// Routes
app.use("/api", formRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
