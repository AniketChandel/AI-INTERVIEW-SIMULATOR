const api = require("../config/gemini");

exports.checktest = async (req, res) => {
  try {
    const { name, resumescore, answers } = req.body;

    const response = await api.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Name:${name} ResumeScore:${resumescore} Answers:${JSON.stringify(answers)} Return JSON`
    });

    const cleaned = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    res.json(JSON.parse(cleaned));
  } catch (err) {
    res.status(500).json({ message: "error" });
  }
};