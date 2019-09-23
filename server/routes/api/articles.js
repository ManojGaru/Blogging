const express = require('express');
const router = express.Router();

const Article = require('../../models/Article');
const Comment = require('../../models/Comment')

// @route   GET api/posts/test
// @desc    Tests post route
// @access  Public
router.get('/test', (req, res) => res.json({
    msg: 'Posts Works'
}));


router.post('/', (req, res) => {
    let success = {};
    let errors = {};
    let newArticle = new Article({
        title: req.body.article.title,
        description: req.body.article.description,
        body: req.body.article.body,
        tagList:req.body.article.tagList,
        createdAt: req.body.article.createdAt,
        updatedAt: req.body.article.updatedAt,
        favorited: req.body.article.favorited,
        favoritesCount: req.body.article.favoritesCount,
        author: req.body.article.author,
        slug: makeid(5)
    })
    console.log(newArticle);

    newArticle.save().then((article) => {
        if (!article) {
            errors.message = "something went wrong";
            errors.status = 400;
            res.status(400).json(errors)
        }
        success.article = article
        success.message = 'Article saved successfully0'
        success.status = 200;
        res.status(200).json(success);
    }).catch(err => console.log(err));
});

router.put('/:slug', (req, res) => {
    let success = {};
    let errors = {};
    let newArticle = {
        title: req.body.article.title,
        description: req.body.article.description,
        body: req.body.article.body,
        tagList: req.body.article.tagList,
        //createdAt: req.body.article.createdAt,
       // updatedAt: Date.now(),
        favorited: req.body.article.favorited==null?req.body.article.favorited:0,
        favoritesCount: req.body.article.favoritesCount==null?req.body.article.favoritesCount:Number(0),
    }

    //console.log(req.params.id,newArticle);

    Article.findOneAndUpdate({slug:req.params.slug},
       newArticle,
   {
        new: true
    }).then((article) => {
        if (!article) {
            errors.message = "something went wrong";
            errors.status = 400;
            res.status(400).json(errors)
        }
        success.message = 'Article Updated successfully0'
        success.status = 200;
        success.article = article
        res.status(200).json(success);
    }).catch(err => console.log(err));
});



//GET all arttcles
router.get('/all', (req, res) => {
    console.log(req.query);
    const q = req.query.author;

    Article.aggregate([{
            $skip: Number(req.query.offset)
        },
        {
            $lookup: {
                from: "users",
                localField: "author",
                foreignField: "_id",
                as: "author"
            },
        },
        {

            $match: q ? {
                "author.username": req.query.author
            } : {}

        }

    ]).then((articles) => {
        //articles.author = articles.author[0]
        let success = {};
        let errors = {};
        if (!articles.length > 0) {
            errors.message = "NO Artilces found";
            errors.status = 400;
            res.status(400).json(errors)
        }

        success.articles = articles;
        success.status = 200;
        res.status(200).json(success);
    })
})
//GET by slug
router.get('/:slug', (req, res) => {
    console.log(req.params.slug);

    let success = {};
    let errors = {};
    Article.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "author",
                    foreignField: "_id",
                    as: "author"
                },
            },
            {

                $match: {
                    "slug": req.params.slug
                } 
    
            }

        ])
        .then((article) => {
            if (!article) {
                errors.message = "No Articles Found";
                errors.status = 400;
                res.status(400).json(errors)
            }
            success.article = article[0]
            success.status = 200;
            res.status(200).json(success);
        }).catch(err => console.log(err));
});

//Delete article
router.delete('/:slug',(req,res)=>{
    
    console.log(req.params.slug,'hgydfydtstrs');
    Article.find({slug:req.params.slug}).then((art)=>{
        console.log(art[0]._id);
       // res.json(art)
       Article.findByIdAndRemove(art[0]._id).then((artile)=>{
        res.status(200).json('article deleted')
    })
       
    }).catch(err=>console.log(err))
    
    
})

router.post('/:slug/comments',  (req, res) => {
    // console.log(req.body);
console.log(req.params.slug,'kkkkkk');


    const newComment = new Comment({
     
      body: req.body.comment.body,
      slug:req.params.slug,
      createdAt: req.body.comment.createdAt,
      author: req.body.comment.author
    });
    newComment.save().then(comment => res.json(comment))
      .catch(err => console.log(err));
  });

  router.get('/:slug/comments',  (req, res) => {
    // console.log(req.body);
let success = {};
   
    Comment.find({slug:req.params.slug}).populate({path:'author'}).then((comment) =>{
        success.comment = comment;
        res.status(200).json(success)
    })
      .catch(err => console.log(err));
  });

  router.delete('/:slug/comments/:id',(req,res)=>{
      Comment.findByIdAndRemove(req.params.id).then((success)=>{
          res.status(200).json(success)
      }).catch(err=>console.log(err));
  })

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = router;