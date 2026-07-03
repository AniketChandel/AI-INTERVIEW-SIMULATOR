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
    
    const resptext =  pdf.text.slice(0, 6000);   
const question = await api.models.generateContent({
  model: "gemini-2.5-flash",
contents: `
Resume:
${resptext}

Analyze the resume and return ONLY this JSON:

{
  {
  "name of candidate": "",
  "phone number": "",
  "resumescore": 0,
  "skills": {
    "programmingLanguages": [],
    "frontend": [],
    "backend": [],
    "databases": [],
    "frameworks": [],
    "tools": []
  },
  "questions": [
    {
      "questionnumber": 1,
      "question": "",
      "difficulty": "easy",
      "skill": ""
    },
    {
      "questionnumber": 2,
      "question": "",
      "difficulty": "medium",
      "skill": ""
    },
    {
      "questionnumber": 3,
      "question": "",
      "difficulty": "medium",
      "skill": ""
    },
    {
      "questionnumber": 4,
      "question": "",
      "difficulty": "hard",
      "skill": ""
    },
    {
      "questionnumber": 5,
      "question": "",
      "difficulty": "medium",
      "skill": ""
    }
  ]
}
`
})

const cleaned = question.text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();
console.log(cleaned)
res.json(JSON.parse(cleaned));

    fs.unlinkSync(req.file.path);

 
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error reading PDF",
    });
  }
});

app.post("/checkanswer", async (req, res) => {
  try {
    const { question, answer } = req.body;

    const response = await api.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an interview evaluator.

Interview Question:
${question}

Candidate Answer:
${answer}

Evaluate the candidate's answer.

Give:
1. Whether the answer is correct or not.
2. Score out of 10.
3. A short explanation.
4. The ideal answer.

Return only plain text.
`,
    });

    res.json({
      feedback: response.text,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      feedback: "Something went wrong."
    });
  }
});
app.post("/checktest", async (req, res) => {
  try {

    const { name, resumescore, answers } = req.body;

    const response = await api.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
You are an expert AI Interview Evaluator.

Candidate Name:
${name}

Resume Score:
${resumescore}

Interview Answers:
${JSON.stringify(answers)}

Evaluate every answer.

Return ONLY valid JSON.

{
  "name":"",
  "resumescore":0,
  "totalscore":0,
  "overallfeedback":"",
  "questions":[
    {
      "questionnumber":1,
      "score":0,
      "feedback":""
    }
  ]
}
`
    });

    const cleaned = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(cleaned));

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Something went wrong."
    });

  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
