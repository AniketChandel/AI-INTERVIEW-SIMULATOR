const express = require("express");
const multer = require("multer");
const { uploadresume } = require("../controllers/uploadcontroller");

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/", upload.single("resume"), uploadresume);

module.exports = router;