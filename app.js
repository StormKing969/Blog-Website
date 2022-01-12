const express = require("express");
const bodyParse = require("body-parser");
const ejs = require("ejs");

const app = express();

app.set("view engine", "ejs");

app.use(bodyParse.urlencoded({extended: true}));
app.use(express.static("public"));