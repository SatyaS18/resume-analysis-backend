const express = require("express");
const morgan = require("morgan");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(morgan("combined")); // logs all requests

connectDB();

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/resume", require("./routes/resumeRoutes"));
app.use("/api/search", require("./routes/searchRoutes"));
app.get("/", (req, res) => {
  res.send("Resume Analysis API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
