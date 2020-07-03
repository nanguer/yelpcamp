
var Campground = require("./models/campgrounds");
var Comment = require("./models/comment");

var data = [
            {name: "Cloud's Rest",
            image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?h=350&auto=compress&cs=tinysrgb",
            description  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  
            }, 
            {name: "Skyfall",
            image: "https://images.pexels.com/photos/112378/pexels-photo-112378.jpeg?h=350&auto=compress&cs=tinysrgb",
            description  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  
            },
            {name: "River's creek ",
            image: "https://images.pexels.com/photos/756780/pexels-photo-756780.jpeg?h=350&auto=compress&cs=tinysrgb",
            description  : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."  
            }
        ];

function seedDB(){
                    //Remove Campgrounds
                        Campground.deleteMany({}, function(err){
                            if(err){
                                console.log(err);
                            } else {
                                console.log("removed campgrounds!");
                                  //Add a few Campgrounds
                                  data.forEach(function(seed){
                                Campground.create(seed, function(err, campground){
                                                 if(err){
                                                        console.log(err);
                                                    } else {
                                                        console.log("added a campground");
                                                        //create a comment on each campground
                                                        Comment.create(
                                                            {
                                                                text: "This place is awesome, beatiful views. Pitty there's no internet...",
                                                                author: "El Patada"
                                                            }, function(err, comment){
                                                                if(err){
                                                                    console.log(err);
                                                                } else {
                                                                campground.comments.push(comment._id);
                                                                campground.save();
                                                                console.log("Created new comment");
                                                                }
                                                            });
                                                            
                                                        }
                                        
                                                    });
                                                });
                                    }
                                 });
        
                    //Add some comments
                }
                
module.exports = seedDB;