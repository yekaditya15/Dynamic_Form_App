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
app.use(cors());
app.use(morgan("dev"));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", formRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
