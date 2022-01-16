// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const port = process.env.PORT || 3000;

const app = express();
let posts = []

// // Starting home page content
const startingHomeContent = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem ipsam quod sunt autem reiciendis quaerat cum magnam cupiditate temporibus, repudiandae, facilis ducimus sit aperiam, explicabo libero accusantium rem reprehenderit. Maxime."

// Starting about page content
const aboutContent = "Lorem quod sunt autem reiciendis quaerat cum magnam cupiditate temporibus, explicabo libero accusantium rem reprehenderit. Maxime, repudiandae, facilis ducimus sit aperiam. ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem ipsam "

// Starting contact page content
const contactContent = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationemmagnam cupiditate ipsam quod sunt autem reiciendis quaerat cum temporibus, repudiandae, facilis ducimus sit aperiam, explicabo libero accusantium rem reprehenderit. Maxime."

// needed to use EJS
app.set("view engine", "ejs");

// need to use "body"
app.use(bodyParser.urlencoded({extended: true}));
// used to style the pages
app.use(express.static("public"));

// Home Page
app.get("/", function(req, res) {
    res.render("home", {
        homeContent: posts,
        startingContent: startingHomeContent
    });
})

// About Page
app.get("/about", function(req, res) {
    // .render("ejs page", {any variable in the ejs page: corresponding variable in app.js})
    res.render("about", {aboutContent: aboutContent});
})

// Contact Page
app.get("/contact", function(req, res) {
    res.render("contact", {contactContent: contactContent});
})

// Compose Page
app.get("/compose", function(req, res) {
    res.render("compose");
})

app.post("/compose", function(req, res) {
    // A javascript object to store the user input
    const post = {
        inputTitle :req.body.userTitleInput,
        inputContent : req.body.userPostInput
    }

    // Update the posts array
    posts.push(post);

    // Sends the user back to the home page
    res.redirect("/");
})

// Compose Page
app.get("/post/:topic", function(req, res) {
    const postTitle = req.params.topic;

    posts.forEach(post => {
        if(post.inputTitle === postTitle) {
            console.log("Match Found");
        } else {
            console.log("No Match Found");
        }
    })
})

app.listen(port, function() {
    console.log("Server is connected to port " + port);
})