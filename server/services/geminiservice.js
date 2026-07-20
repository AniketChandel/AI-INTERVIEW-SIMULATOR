const api = require("../config/gemini");

exports.generateresumeanalysis = async (text) => {
  const response = await api.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `
Analyze this resume.

Return ONLY valid JSON in this exact format:

{
  "name of candidate": "candidate name",
  "resumescore": number,
  "questions": [
    {
      "question": "interview question 1"
    },
    {
      "question": "interview question 2"
    },
    {
      "question": "interview question 3"
    },
    {
      "question": "interview question 4"
    },
    {
      "question": "interview question 5"
    }
  ]
}

Resume:
${text}
`
  });

  return response.text;
};
