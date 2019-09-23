const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    slug: {
        type: String,
        required:true
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    body: {
        type: String
    },
    tagList: {
        type: [String]
    },
    createdAt: {
        type: String,
        //required:true
    },
    updatedAt: {
        type: String
    },
    favorited: {
        type: Boolean
    },
    favoritesCount: {
        type: Number
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
})

module.exports = Article = mongoose.model('Article', ArticleSchema);