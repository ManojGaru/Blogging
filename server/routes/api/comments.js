const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
//const jwt = require('jsonwebtoken');
//const keys = require('../../config/keys');
const passport = require('passport');


const validateCommentInput = require('../../validation/comment');

const Comment = require('../../models/Comment')


// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Products Works' }));



module.exports = router;