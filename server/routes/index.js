const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// //Root route
// router.get("/", function(req, res){
//     res.render("landing");
// });

//handle sign up logic
router.post('/register', async (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const foundUser = await User.findOne({ email: req.body.email });
  if (foundUser) {
    return res.status(400).json({
      email: 'Email already exists',
    });
  } else {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    bcrypt.genSalt(10, (err, salt) => {
      if (err) console.error('There was an error', err);
      else {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) console.error('There was an error', err);
          else {
            newUser.password = hash;
            newUser.save().then((user) => {
              console.log(user);
              res.json(user);
            });
          }
        });
      }
    });
  }
});

//Handle login logic
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const username = req.body.username;
  const password = req.body.password;

  const userFound = await User.findOne({ username });
  if (!userFound) {
    errors.username = 'User not found';
    return res.status(404).json(errors);
  }

  bcrypt.compare(password, userFound.password).then((isMatch) => {
    if (isMatch) {
      const payload = {
        id: userFound.id,
        username: userFound.username,
      };
      jwt.sign(
        payload,
        'secret',
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) console.error('There is some error in token', err);
          else {
            res.json({
              success: true,
              token: `Bearer ${token}`,
            });
          }
        }
      );
    } else {
      errors.password = 'Incorrect Password';
      return res.status(400).json(errors);
    }
  });
});

//Logout route
router.get('/logout', function (req, res) {
  req.logout(); //this comes with Passport Authenticate
  req.flash('success', 'Logged you out!');
  res.redirect('/campgrounds');
});

module.exports = router;
