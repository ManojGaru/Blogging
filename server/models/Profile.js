const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
    username: {
        type: String
    },
    bio: {
        type: String
    },
    image: {
        type: String
    },
    following: {
        type: Boolean
    },
})

module.exports = Profile = mongoose.model('Profile', ProfileSchema);