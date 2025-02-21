# Resume Analysis Backend

## 📌 Project Overview
This project is a **Resume Analysis API** that extracts, processes, and searches resumes using AI (Gemini API) and stores the data in MongoDB. Users can upload resumes, and the system extracts **name, email, education, experience, and skills**, making it easy to search and retrieve relevant applicants.

## 🚀 Features
* Upload and process resumes (PDF format)
* Extract structured information using **Gemini API**
* Encrypt and store data securely in **MongoDB**
* Search for applicants based on names
* JWT-based authentication for secure API access
* Deployed on **Render**


## 🛠️ Setup & Installation

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/SatyaS18/resume-analysis-backend.git
cd resume-analysis-backend
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Configure Environment Variables
Create a **.env** file and add:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
ENCRYPTION_SECRET=your_encryption_secret
GEMINI_API_KEY=your_gemini_api_key
```

### 4️⃣ Start the Server
```bash
npm start
```
The backend will run on **http://localhost:5000**

## 📌 API Documentation

### 🔹 1. Health Check
**Endpoint:** `GET /`
```json
{
  "message": "Resume Analysis API is running..."
}
```

### 🔹 2. Process Resume
**Endpoint:** `POST /api/resume/process`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "resumeUrl": "https://example.com/resume.pdf"
}
```

**Response:**
```json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "skills": ["Python", "Node.js"],
  "summary": "Experienced software engineer"
}
```

### 🔹 3. Search Resumes
**Endpoint:** `POST /api/search`

**Headers:**
```json
{
  "Authorization": "Bearer YOUR_JWT_TOKEN",
  "Content-Type": "application/json"
}
```

**Body:**
```json
{
  "name": "John Doe"
}
```

**Response:**
```json
[
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "skills": ["Python", "Node.js"],
    "summary": "Experienced software engineer"
  }
]
```

## ❗ Issues & Fixes

### 1️⃣ Issue: `Invalid Token` (401 Unauthorized)
* **Fix:** Ensure you send a valid JWT token in the headers

### 2️⃣ Issue: `No matching records found`
* **Fix:** Ensure the resume is processed before searching

## 📜 License
This project is open-source and available under the **MIT License**.

## ✨ Contributors
* Satyakant Sahu

## 🚀 Happy Coding!
