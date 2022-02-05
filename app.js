// ==================== Setup Section Start ========================
// Using .env file to store sensitive data
require("dotenv").config();

// Extracting the required information
const DB = String(process.env.DB_URL);

// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const port = process.env.PORT || 3000;

const app = express();
// let posts = [];

// importing local module
const truncate = require(__dirname + "/helper/truncateString.js");

// needed to use EJS
app.set("view engine", "ejs");

// need to use "body"
app.use(bodyParser.urlencoded({extended: true}));
// used to style the pages
app.use(express.static("public"));

// Create mongoose DB
mongoose.connect(DB);

// ==================== Setup Section End ========================

// ==================== Schema Section Start ========================

const postsSchema = {
    name: String,
    content: String
};

const Post = mongoose.model("Post", postsSchema);

// ==================== Schema Section End ========================

// ==================== Get/Post Section Start ========================

// Home Page
app.get("/", function(req, res) {
    Post.find({}, function(err, itemsFound) {
        if(!err) {
            res.render("home", {
                homeContent: itemsFound,
                truncateString: truncate
            });
        } else {
            console.log(err);
        }
    })
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
    const postTitle = req.body.userTitleInput;
    const postContent = req.body.userPostInput;


    // Update the posts array
    updatePostList(postTitle, postContent).save();

    // Sends the user back to the home page
    res.redirect("/");
})

// Compose Page
app.get("/posts/:topic", function(req, res) {
    // Convert to lowercase using lodash
    const postTitle = _.lowerCase(req.params.topic);

    Post.find({}, function(err, itemsFound) {
        if(!err) {
            itemsFound.forEach(post => {
                const storedTitle = _.lowerCase(post.name);

                if(storedTitle === postTitle) {
                    res.render("post", {
                        chosenPostTitle: post.name, 
                        chosenPostContent: post.content
                    });
                } 
            })
        } else {
            console.log(err);
        }
    })
})

// ==================== Get/Post Section End ========================

// ==================== Main Function Start ========================

app.listen(port, function() {
    console.log("Server is connected to port " + port);
});

// ==================== Main Function End ========================

// ==================== Sub Function Start ========================

function updatePostList(userTitle, userInput) {
    const post = new Post({
        name: userTitle,
        content: userInput
    });

    return post;
}

// ==================== Sub Function End ========================