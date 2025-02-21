const jwt = require("jsonwebtoken");
const axios = require("axios");
const { extractTextFromPDF } = require("../utils/pdfParser");
const { processWithGemini } = require("../services/geminiService");
const { encryptData } = require("../services/encryptionService");
const Applicant = require("../models/applicantModel");

const processResume = async (req, res) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    jwt.verify(token, process.env.JWT_SECRET);

    console.log("Starting resume processing...");

    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "PDF URL is required" });

    // extract text from pdf
    const extractedText = await extractTextFromPDF(url);
    if (!extractedText)
      return res.status(500).json({ error: "Failed to extract text" });

    console.log("PDF text extraction successful.");

    // send text to gemini api for structured extraction
    const structuredData = await processWithGemini(extractedText);
    if (!structuredData)
      return res.status(500).json({ error: "LLM failed to extract data" });

    console.log("Structured data received from Gemini API:", structuredData);

    // convert email array to string before encryption
    const encryptedName = encryptData(structuredData.name);
    const encryptedEmail = encryptData(
      Array.isArray(structuredData.email)
        ? structuredData.email.join(", ")
        : structuredData.email
    );

    // format data to match updated schema 
    const newApplicant = new Applicant({
      name: encryptedName,
      email: encryptedEmail,
      education: structuredData.education.map((edu) => ({
        degree: edu.degree || "Not Mentioned",
        branch: edu.branch || "Not Mentioned",
        institution: edu.institution || "Not Mentioned",
        year: edu.year || "Not Mentioned",
      })),
      experience: structuredData.experience.map((exp) => ({
        job_title: exp.job_title || "Not Mentioned",
        company: exp.company || "Not Mentioned",
        start_date: exp.start_date || "Not Mentioned",
        end_date: exp.end_date || "Not Mentioned",
      })),
      skills: structuredData.skills || [],
      summary: structuredData.summary || "Not Provided",
    });

    // Save to mongodb
    await newApplicant.save();

    console.log("Resume successfully processed and saved to MongoDB.");

    res.status(200).json({
      name: encryptedName,
      email: encryptedEmail,
      education: newApplicant.education,
      experience: newApplicant.experience,
      skills: newApplicant.skills,
      summary: newApplicant.summary,
    });
  } catch (error) {
    console.error("Resume Processing Error:", error);
    res.status(500).json({ error: "Resume processing failed" });
  }
};

module.exports = { processResume };
