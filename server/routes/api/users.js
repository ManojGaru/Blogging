const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');



// Load User model
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

//Registratio
router.post('/', (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = 'Email already exists';
      return res.status(400).json(errors);
    } else {
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser = new User({
        name: req.body.user.name,
        email: req.body.user.email,
        username:req.body.user.username,
        image:avatar,
        password: req.body.user.password,
        bio:req.body.user.bio,
        following:false,
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//Update User
router.put('/', (req, res) => {
  let success = {};
      const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

      const newUser =  {
        name: req.body.user.name,
        email: req.body.user.email,
        username:req.body.user.username,
        image:avatar,
        password: req.body.user.password,
        bio:req.body.user.bio,
        following:req.body.user.following?req.body.user.following:false,
      };

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          User.findByIdAndUpdate(req.body.user.id,{$set:newUser},{new:true})
            .then((user) => {
              success.status=200;
              success.user = user
              res.json(success)
            })
            .catch(err => console.log(err));
        });
      });
    
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req, res) => {
 // const { errors, isValid } = validateLoginInput(req.body);
 let errors = {};

  const email = req.body.user.email;
  const password = req.body.user.password;
  console.log(password);
  

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check for user
    if (!user) {
      errors.email = 'User not found';
      return res.status(404).json(errors);
    }
    // Check Password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        console.log(isMatch);
        console.log(user.id,'user ID');
        
        
        // User Matched
        const payload = { id: user.id, name: user.name, image: user.image }; // Create JWT Payload

        // Sign Token
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              success: true,
              token: 'Bearer ' + token,
              id: user.id,
              username:user.username,
              image:user.image
            });
          }
        );
      } else {
        errors. password = 'Password incorrect';
        return res.status(400).json(errors);
      }
    },err=>console.log(err)).catch(err=>console.log(err))
  });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get(
  '/current',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      username:req.user.username
    });
  }
);

module.exports = router;
