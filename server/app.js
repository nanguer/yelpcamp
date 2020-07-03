require('dotenv').config();
const path = require('path');

var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
    doteEnv        = require('dotenv').config(),
    flash          = require("connect-flash"),
    passport       = require("passport"),
    LocalStrategy  = require("passport-local"),
    methodOverride = require("method-override"),
    Campground     = require("./models/campgrounds"),
    Comment        = require("./models/comment"),
    User           = require("./models/user"),
    seedDB         = require("./seeds");
    cors           = require('cors')
    
//Requiring routes    
var commentsRoutes   = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes      = require("./routes/index");
const { countReset } = require('console');


//seedDB(); //Seed the database

app.use(cors());
app.use(flash());

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Tibet y Neu se van a Polonia!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});


mongoose.set("useUnifiedTopology", true);
mongoose.connect(process.env.DATABASEURL, {useNewUrlParser: true, useCreateIndex:true});



app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));

app.use("/campgrounds/:id/comments", commentsRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", indexRoutes);

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, '../yelpcamp-react/build', 'index.html'));
//   });


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server has started now!");
})