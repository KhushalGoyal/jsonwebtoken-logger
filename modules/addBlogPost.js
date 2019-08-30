const express = require('express');
let router = express.Router();
let middleware = require('../contollers/middleware')

const BlogPost = require('../contollers/addBlogPost')

let blogPost = new BlogPost();

router.post('/api/addBlogDetails',middleware.checkToken,blogPost.addBlogDetails)

router.get('/api/getBlogs',blogPost.getBlogs)

router.post('/api/voteForFavorite',middleware.checkToken,blogPost.voteForFavorite)

router.get('/api/checkToken',middleware.checkToken,blogPost.dummyAPI)

module.exports = router;