const express = require("express");
const dotenv = require("dotenv");
const db = require("./db/db");
const searchRoutes = require("./routes/searchRoutes");
const cors = require("cors");


// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
    res.json({ message: "Restaurant Search API is running ✅" });
});

// Search routes
app.use("/search", searchRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});