const express = require("express");
const cors = require("cors");
require("dotenv").config();

const uploadroutes = require("./routes/uploadroutes");
const answerroutes = require("./routes/answerroutes");
const testroutes = require("./routes/testroutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/upload", uploadroutes);
app.use("/checkanswer", answerroutes);
app.use("/checktest", testroutes);

app.listen(process.env.PORT || 5000);