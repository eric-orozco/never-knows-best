const express = require('express');
const router = express.Router();

const Post = require('../models/post');

router.post('', (req, res, next) => {

    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });

    // store post in DB
    post.save().then(createdPost => {
        console.log('result', createdPost);
        // 201 added new resource successfully
        res.status(201).json({
            message: 'Post added successfully',
            postId: createdPost._id
        });
        console.log(post);
    });
});

router.put("/:id", (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    });
    Post.updateOne({ _id: req.params.id }, post).then(result => {
        res.status(200).json({ message: "Update successful!" });
    });
});

// use middleware for posts path
router.get('', (req, res, next) => {
    Post.find()
        .then(documents => {
            // set success status and send express response
            res.status(200).json({
                message: 'posts fetched successfully',
                posts: documents
            });
        })
        .catch();
});

router.get("/:id", (req, res, next) => {
    Post.findById(req.params.id).then(post => {
        if (post) {
            res.status(200).json(post);
        }
        else {
            res.status(404).json({ message: "Post not found!" });
        }
    });
});

router.delete('/:id', (req, res, next) => {
    Post.deleteOne({
            _id: req.params.id
        })
        .then(result => {
            console.log(req.params.id);
            console.log('result', result);
            res.status(200).json({
                message: 'post deleted'
            });
        });
});

module.exports = router;
