const api = require("../config/gemini");

exports.checkanswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    const response = await api.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Question:\n${question}\nAnswer:\n${answer}\nEvaluate answer and return plain text`
    });

    res.json({ feedback: response.text });
  } catch (err) {
    res.status(500).json({ feedback: "error" });
  }
};