const express = require("express");
const { searchResume } = require("../controllers/searchController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, searchResume);

module.exports = router;
