const express = require('express');
let router = express.Router();

const BlogPost = require('../contollers/addBlogPost')

let blogPost = new BlogPost();

router.get('/getSchemaDetails',blogPost.getSchemaDetails)


module.exports = router;