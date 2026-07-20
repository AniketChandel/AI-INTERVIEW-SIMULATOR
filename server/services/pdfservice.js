const fs = require("fs");
const pdfparse = require("pdf-parse");

exports.extractpdftext = async (filepath) => {
  const data = fs.readFileSync(filepath);
  const pdf = await pdfparse(data);
  return pdf.text;
};