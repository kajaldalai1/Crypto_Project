const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
const statsRoutes = require("./routes/statsRoutes");
const deviationRoutes = require("./routes/deviationRoutes");

app.use("/api", statsRoutes);
app.use("/api", deviationRoutes);

// Start background jobs
require("./jobs/fetchCryptoData");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
