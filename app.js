// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const port = process.env.PORT || 3000;

const app = express();

// Starting home page content
const homeContent = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem ipsam quod sunt autem reiciendis quaerat cum magnam cupiditate temporibus, repudiandae, facilis ducimus sit aperiam, explicabo libero accusantium rem reprehenderit. Maxime."

// Starting about page content
const aboutContent = "Lorem quod sunt autem reiciendis quaerat cum magnam cupiditate temporibus, explicabo libero accusantium rem reprehenderit. Maxime, repudiandae, facilis ducimus sit aperiam. ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem ipsam "

// Starting contact page content
const contactContent = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationemmagnam cupiditate ipsam quod sunt autem reiciendis quaerat cum temporibus, repudiandae, facilis ducimus sit aperiam, explicabo libero accusantium rem reprehenderit. Maxime."

// needed to use EJS
app.set("view engine", "ejs");

// need to use "body"
app.use(bodyParser.urlencoded({extended: true}));
// used to style the pages
app.use(express.static("public"))

// Home Page
app.get("/", function(req, res) {
    res.render("home", {homeContent: homeContent})
})

// About Page
app.get("/about", function(req, res) {
    res.render("about", {aboutContent: aboutContent})
})

// Contact Page
app.get("/contact", function(req, res) {
    res.render("contact", {contactContent: contactContent})
})

app.listen(port, function() {
    console.log("Server is connected to port " + port)
});