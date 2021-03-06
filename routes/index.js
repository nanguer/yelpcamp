var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//Root route
router.get("/", function(req, res){
    res.render("landing");
});


//Show register form
router.get("/register", function(req, res){
  res.render("register", {page: 'register'});
});

//handle sign up logic
router.post("/register", function(req, res) {
      //CREATE NEW USER
      var newUser = new User({username: req.body.username});
      User.register(newUser, req.body.password, function(err, user){
        if(err){
            
            return res.render("register", {"error": err.message});
        }
        //AUTHENTICATE NEW USER
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect("/campgrounds");
        });
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res){
   res.render("login", {page:'login'});
});

//Handle login logic
router.post("/login", passport.authenticate("local", 
        {
            successRedirect: "/campgrounds",
            successFlash: "Welcome!",
            failureRedirect: "/login",
            failureFlash: 'Invalid username or password. Try again...'
            
        }), function(req, res) {
            
    
});


//Logout route
router.get("/logout", function(req, res){
    req.logout();//this comes with Passport Authenticate
    req.flash("success", "Logged you out!");
    res.redirect("/campgrounds");
});

module.exports = router;