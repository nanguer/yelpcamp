// All thw middleware goes here
var Campground = require("../models/campgrounds");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    //Is user logged in?
    if(req.isAuthenticated()){
          Campground.findById(req.params.id, (err, foundCampground) => {
            if(err){
                   res.status(400).json({error:"Campground not found"})
                } else {
                        if(foundCampground.author.id.equals(req.user._id)){
                            next();
                        } 
                     else {
                       res.status(400).json({error:"You don't have permission to do that"})
                    }
                }
    });
        
    } else {
         res.status(400).json({error:"You need to be logged in to do that"})
    }
};


middlewareObj.checkCommentOwnership = function(req, res, next){ 
    //Is user logged in?
    if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
                } else {
                    //does user own the comment?                       
                        if(foundComment.author.id.equals(req.user._id)){
                            next();
                        } 
                     else {
                        req.flash("error", "You don't have permission to do that");
                        res.redirect("back");
                    }
                }
    });
        
    } else {
        req.flash("error", "You need to be logged in to do that");
        res.redirect("back");
    }
        
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
  res.status(400).json({error:"Please login first"})
};

module.exports = middlewareObj;