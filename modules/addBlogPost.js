const express = require('express');
let router = express.Router();
let middleware = require('../contollers/middleware')

const BlogPost = require('../contollers/addBlogPost')

let blogPost = new BlogPost();

router.post('/api/addBlogDetails',middleware.checkToken,blogPost.addBlogDetails)


module.exports = router;