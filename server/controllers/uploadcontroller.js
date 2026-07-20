const fs = require("fs");
const { extractpdftext } = require("../services/pdfservice");
const { generateresumeanalysis } = require("../services/geminiservice");
const { cleanjson } = require("../utils/cleanjson");

exports.uploadresume = async (req, res) => {
  try {
    const text = await extractpdftext(req.file.path);

    const sliced = text.slice(0, 6000);

    const result = await generateresumeanalysis(sliced);

    const cleaned = cleanjson(result);

    fs.unlinkSync(req.file.path);

    res.json(JSON.parse(cleaned));
  } catch (err) {
    res.status(500).json({ message: "upload failed" });
  }
};