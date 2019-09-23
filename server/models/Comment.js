const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    body: {
        type: String
    },
    createdAt: {
        type: String
    },
    slug:{
        type:String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
})
module.exports = Comment = mongoose.model('Comment', CommentSchema);