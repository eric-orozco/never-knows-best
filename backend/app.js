/**
 *  
 * 
 */
const express = require('express');

// Node JS, server-side Express app
const app = express();

// use middleware for posts path
app.use('/api/posts', (req, res, next) => {
    console.log('first middleware');
    next();
});

app.use((req, res, next) => {
    console.log('second middleware');
    
    const posts = [{
            id: 'gadgadfgadg',
            title: 'first post',
            content: 'testing'
        },
        {
            id: 'fhdfghrbs',
            title: 'second post',
            content: 'gooooood'
        },
        {
            id: 'erbebdfgh',
            title: 'third post',
            content: 'ok, working'
        },
        {
            id: 'xcvhsfgh',
            title: 'fourth post',
            content: 'awesome'
        },
    ];
    // set success status and send express response
    res.status(200).json({
        message: 'posts fetched successfully',
        posts: posts
    });
});


module.exports = app;
