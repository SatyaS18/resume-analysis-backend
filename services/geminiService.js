const axios = require("axios");
require("dotenv").config();

const processWithGemini = async (resumeText) => {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    const prompt = `Extract structured data from this resume text:

        Resume: ${resumeText}

        Output JSON format:
        {
            "name": "<full name>",
            "email": "<email>",
            "education": [
                {
                    "degree": "<degree>",
                    "branch": "<branch>",
                    "institution": "<institution>",
                    "year": "<year>"
                }
            ],
            "experience": [
                {
                    "job_title": "<job title>",
                    "company": "<company>",
                    "start_date": "<start date>",
                    "end_date": "<end date>"
                }
            ],
            "skills": ["<skill1>", "<skill2>", "<skillN>"],
            "summary": "<brief summary>"
        }`;

    console.log("Sending request to Gemini API...");

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        contents: [{ role: "user", parts: [{ text: prompt }] }],
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("Gemini API Response:", JSON.stringify(response.data, null, 2));

    if (!response.data || !response.data.candidates) {
      throw new Error("Invalid Gemini API response");
    }

    let extractedText = response.data.candidates[0].content.parts[0].text;

    //Fix: Remove Markdown Wrapper (` ```JSON ... ``` `) and clean text
    extractedText = extractedText
      .replace(/```json/i, "")
      .replace(/```/g, "")
      .trim();
    extractedText = extractedText.replace(/^JSON\n/, "").trim(); // remove "JSON" prefix

    // Fix: Remove bad line breaks
    extractedText = extractedText.replace(/\n\s+/g, " "); // remove unwanted new lines and spaces
    extractedText = extractedText.replace(/\s{2,}/g, " "); // remove extra space
    extractedText = extractedText.replace(/\b(\d+)\s*th\b/gi, "$1th"); // fixe "9 th" → "9th"

    console.log("Extracted JSON:", extractedText);

    return JSON.parse(extractedText); 
  } catch (error) {
    console.error("Gemini API Error:", error.response?.data || error.message);
    throw new Error("LLM failed to extract data");
  }
};

module.exports = { processWithGemini };
