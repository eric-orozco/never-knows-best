const mongoose = require('mongoose');

// blue print of a post
const postSchema = mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

// expose a post model
module.exports = mongoose.model('Post', postSchema);