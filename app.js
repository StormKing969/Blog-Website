// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const port = process.env.PORT || 3000;

const app = express();

// needed to use EJS
app.set("view engine", "ejs");

// need to use "body"
app.use(bodyParser.urlencoded({extended: true}));
// used to style the pages
app.use(express.static("public"))


app.get("/", function(req, res) {
    
})


app.listen(port, function() {
    console.log("Server is connected to port " + port)
});