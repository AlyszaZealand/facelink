const express = require("express");
const morgan = require("morgan");

const userRoutes = require('./routes/userRoutes')


const app = express();

app.use(morgan("dev")); // viser console - GET / 304 1.530 ms - -
app.use(express.json()); // læser req.body - for POST, PUT og PATCH - ikke GET

app.use('/api/users', userRoutes); // endpoint for user routes

// Export så express kan sendes ud og starter server.js
module.exports = app;


