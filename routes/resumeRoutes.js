const express = require("express");
const { processResume } = require("../controllers/resumeController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/process", authMiddleware, processResume);

module.exports = router;
