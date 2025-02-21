const mongoose = require("mongoose");

const ApplicantSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    education: [
      {
        degree: String,
        branch: String,
        institution: String,
        year: String,
      },
    ],
    experience: [
      {
        job_title: String,
        company: String,
        start_date: String,
        end_date: String,
      },
    ],
    skills: { type: [String], required: true },
    summary: { type: String },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Applicant", ApplicantSchema);
