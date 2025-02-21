const axios = require("axios");
const pdfParse = require("pdf-parse");

const extractTextFromPDF = async (pdfUrl) => {
  try {
    console.log("Downloading PDF...");
    const response = await axios.get(pdfUrl, { responseType: "arraybuffer" });

    console.log("Extracting text...");
    const pdfData = await pdfParse(response.data);

    if (!pdfData.text || pdfData.text.trim() === "") {
      throw new Error(
        "No text found in PDF. File may be scanned or have unsupported encoding."
      );
    }

    console.log("PDF text extraction successful.");
    return pdfData.text;
  } catch (error) {
    console.error("PDF Parsing Error:", error.message);
    throw new Error(
      "Failed to extract text from PDF. Ensure the file is not scanned or password-protected."
    );
  }
};

module.exports = { extractTextFromPDF };
