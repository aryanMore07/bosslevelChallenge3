const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const dotenv = require("dotenv");
dotenv.config();
const _ = require("lodash");

const homeStartingContent = "Welcome, I am Aryan from Navsari, Gujarat, India.I am currently developing my skills to get good job opportunities and also i love to learn new things from people.";
const aboutContent = "My Name Is Aryan More. Currently I Am Pursuing My Bachelor In Computer Application (BCA) Honors from College Of Professional Studies And Applied Sciences Chikli Gujarat Affiliated with Veer Narmad South Gujarat University. I Enjoy Learning About New Technologies And Have Passion For Web Developement.";
const contactContent = "E-mail: aryanmore498@gmail.com || Phone Number: 9925034124 || LinkedIn: https://www.linkedin.com/in/aryan-more-417497216/ || Twitter: https://twitter.com/aRYNMore2110";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.set('strictQuery', false);



mongoose.connect('mongodb+srv://aryan:aryan@aryandb.72kyzaf.mongodb.net/test', {useNewUrlParser: true});


const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts) {
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  });
});


app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });

});

app.get("/posts/:postId", function(req, res){

  const requestedPostId = req.params.postId;
  
    Post.findOne({_id: requestedPostId}, function(err, post){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    });
  
  });

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.listen(PORT || 3000, function() {
  console.log("Server started on port 3000");
});
