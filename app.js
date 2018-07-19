var express = require("express"),
  app = express(),
  bodyParser = require("body-parser"),
  mongoose = require("mongoose");

//connection string for mongodb
mongoose.connect("mongodb://localhost/restful_blog_app");
app.use(bodyParser.urlencoded({ extended: true }));//setting up bodyparser
app.use(express.static(__dirname + "/public"));//setting the public file
app.set("view engine", "ejs");//setting up the view engine

//configuring the model
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now }
});

var Blog = mongoose.model("Blog", blogSchema);

//RESTFUL Routes
app.get("/", function(req, res){
  res.redirect("/blogs"); // making the blogs our default
});

// Blog.create({
//   title: 'This is my first blog',
//   image: "/images/default.jpg",
//   body: "Hello this is my first blog post on this page"
// });

//setting up the redirect link
app.get("/", function(req, res){
  res.redirect("/blogs");
});

//creating the index page
app.get("/blogs", function(req, res){
  //looking for stuff in our database
  Blog.find({}, function(err, blogs){
    if(err){
      console.log("Uh oh!...", err);
    }else{
      res.render("index", { blogs: blogs});
    }
  })
});

//new route
app.get("/blogs/new", function(req, res){
  res.render("new");
});

//create route
app.post("/blogs", function(req, res){
  //create blog body will return the blog to us
  Blog.create(req.body.blog, function(err, newBlog){
    if(err){
      console.log("uh oh, something went wrong...", err);
    }else{
      res.redirect("/blogs");
    }
  });
});

app.listen(3000, function(){
  console.log("Server is running on port: 3000")
})