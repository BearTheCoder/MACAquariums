require('dotenv').config; //process.env.VARIABLE used for Railway deployment
const express = require("express");
const app = express();
app.listen(process.env.PORT, () => console.log("listening..."));
app.use(express.static('public'));
app.use(express.json());