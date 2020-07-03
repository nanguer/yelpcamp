const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const validateRegisterInput = require('../validation/register');

//Root route
router.get("/", function(req, res){
    res.render("landing");
});


//Show register form
router.get("/register", function(req, res){
  res.render("register", {page: 'register'});
});

//handle sign up logic
router.post("/register", (req, res) => {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newUser = new User({username: req.body.username, email:req.body.email});
     
      User.register(newUser, req.body.password, (err, user) => {
        if(err){
            console.log('theres an error!',err.message)
            return res.status(400).json({error:err.message})
        } else {
            passport.authenticate("local")(req, res, () => {
            console.log(user)
            return res.status(200).json({username:user.username, id:user._id})
        });
        }
       
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