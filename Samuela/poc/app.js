const express = require('express');
const path = require('path');
const app = express();
const geocacheRouter = require('./routes/geocache');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Route vers ton routeur geocache
app.use('/geocache', geocacheRouter);

module.exports = app;
