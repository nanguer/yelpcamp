require('dotenv').config();
const createError = require('http-errors'),
  express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  methodOverride = require('method-override'),
  seedDB = require('./seeds'),
  cors = require('cors'),
  path = require('path');

//Requiring routes
const commentsRoutes = require('./routes/comments'),
  campgroundRoutes = require('./routes/campgrounds'),
  indexRoutes = require('./routes/index');

seedDB(); //Seed the database

app.use(cors());

//PASSPORT CONFIGURATION

app.use(passport.initialize());
require('./passport')(passport);

//MONGOOSE CONFIGURATION
const mongoose = require('mongoose');
const db = mongoose.connection;
mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect(process.env.DATABASEURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
});

db.once('open', function () {
  console.log('Connected to DB');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// app.get('*', function (req, res) {
//   res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
// });

app.use('/campgrounds/:id/comments', commentsRoutes);
app.use('/campgrounds', campgroundRoutes);
app.use('/', indexRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, '../yelpcamp-react/build', 'index.html'));
//   });

app.listen(process.env.PORT, process.env.IP, function () {
  console.log(
    `The YelpCamp Server has started now on ${process.env.IP}:${process.env.PORT}`
  );
});
