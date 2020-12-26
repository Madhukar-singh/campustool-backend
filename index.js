const app = require("./src/services/express");
const mongoose = require("./src/services/mongoose");

app.start();
mongoose.connect();