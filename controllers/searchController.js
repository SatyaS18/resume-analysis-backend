const Applicant = require("../models/applicantModel");
const { decryptData } = require("../services/encryptionService");

const searchResume = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });

    // fetch applicants
    const applicants = await Applicant.find();
    if (!applicants.length)
      return res.status(404).json({ error: "No records in database" });

    // decrypt name and email for comparison
    const decryptedApplicants = applicants.map((applicant) => ({
      ...applicant._doc,
      name: decryptData(applicant.name),
      email: decryptData(applicant.email),
    }));

    // case sensitive search
    const results = decryptedApplicants.filter((applicant) =>
      applicant.name.toLowerCase().includes(name.toLowerCase())
    );

    if (!results.length)
      return res.status(404).json({ error: "No matching records found" });

    res.status(200).json(results);
  } catch (error) {
    console.error("Search API Error:", error);
    res.status(500).json({ error: "Database search failed" });
  }
};

module.exports = { searchResume };

