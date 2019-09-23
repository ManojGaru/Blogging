const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');


//Get Profile Model
const Profile = require('../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Profile Works' }));

//save Profie
router.post('/', (req, res) => {
    let success = {};
    let errors = {};
    const avatar = gravatar.url(req.body.email, {
        s: '200', // Size
        r: 'pg', // Rating
        d: 'mm' // Default
      });

    let newProfile = new Profile({
        username: req.body.username,
        bio: req.body.bio,
        image:avatar,
        following: req.body.following
    })
    //console.log(newArticle);

    newProfile.save().then((article) => {
        if (!article) {
            errors.message = "something went wrong";
            errors.status = 400;
            res.status(400).json(errors)
        }
        success.message = 'Profile saved successfully0'
        success.status = 200;
        res.status(200).json(success);
    }).catch(err=>console.log(err));
});

router.get('/:username',(req,res)=>{
    Profile.find({username:req.params.username}).then((profile)=>{
        let success = {};
        let errors = {};
        if(!profile.length>0){
            errors.message = "NO Artilces found";
            errors.status = 400;
            res.status(400).json(errors)
        }
        success.profile = profile[0];
        success.status = 200;
        res.status(200).json(success);
   
    })
})

module.exports = router;
