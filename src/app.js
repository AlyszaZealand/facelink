const express = require("express");
const morgan = require("morgan");

const app = express();

app.use(morgan("dev")); // viser console - GET / 304 1.530 ms - -
app.use(express.json()); // læser req.body - for POST, PUT og PATCH - ikke GET

// Export så express kan sendes ud og starter server.js
module.exports = app;


