const express = require("express");
const { checktest } = require("../controllers/testcontroller");

const router = express.Router();

router.post("/", checktest);

module.exports = router;