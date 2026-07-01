const express = require("express");
const cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const { GoogleGenAI } = require("@google/genai");
const pdfParse = require("pdf-parse");
const fs = require("fs");
const app = express();

app.use(cors());
app.use(express.json());
const apiKey = process.env.GEMINI_API_KEY;
const PORT = process.env.PORT;

const upload = multer({
  dest: "uploads/",
});

app.get("/", (req, res) => {
  res.send("Backend is running");
});
const api=new GoogleGenAI({
    apiKey:apiKey
})
app.post("/upload", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const data = fs.readFileSync(req.file.path);
    const pdf = await pdfParse(data);
    const restext = pdf.text;    
const question = await api.models.generateContent({
  model: "gemini-2.5-flash",
  contents: `
You are an experienced technical interviewer.

Candidate Resume:
${restext}

Tasks:
1. Analyze the resume.
2. Give an ATS score out of 100 based on the resume only but it should not reach above 95.
3. Extract all technical skills.
4. Ask ONE medium-difficulty interview question based on the resume.
5. Do NOT give the answer.
6. Return ONLY valid JSON.

JSON format:

{
  "resumescore": 0,
  "skills": {
    "programmingLanguages": [],
    "frontend": [],
    "backend": [],
    "databases": [],
    "frameworks": [],
    "tools": []
  },
  "question": {
    "questionnumber": 1,
    "question": "",
    "difficulty": "Medium",
    "skill": "",
    "interviewComplete": false
  }
}
  Return ONLY a raw JSON object.

Do not wrap the JSON inside ``json or ``.

Do not add any explanation before or after the JSON.

`
})


    fs.unlinkSync(req.file.path);

    res.json(
    JSON.parse(question.text)
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error reading PDF",
    });
  }
});
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});