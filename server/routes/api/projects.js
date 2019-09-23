const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
//const jwt = require('jsonwebtoken');
//const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateProjectInput = require('../../validation/project');

// Load User model
const Project = require('../../models/Project');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Products Works' }));

//@route GET api/products/save
//@access public
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log(req.body);
  
    const { errors, isValid } = validateProjectInput(req.body);
  
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
   
    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
      date:Date.now(),
      user: req.body.user,
    });
    newProject.save().then(Project => res.json(Project))
      .catch(err => console.log(err));
  });

  //@ GET all projects 

  router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {

    Project.find().limit(10).sort({ title: 'asc' }).then((project) => {
      let errors = {};
      if (!project) {
        errors.producterror = 'there is no product'
        res.status(404).json({ errors })
      }
      res.status(200).json(project)
    }, (err) => {
      console.log(err);
  
    }).catch(err => console.log(err));
  
  });



module.exports = router;
