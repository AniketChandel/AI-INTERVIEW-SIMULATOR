const express = require("express");
const { checkanswer } = require("../controllers/answercontroller");

const router = express.Router();

router.post("/", checkanswer);

module.exports = router;