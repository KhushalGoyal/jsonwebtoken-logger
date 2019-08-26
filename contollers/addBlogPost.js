const mongoose = require('mongoose');

const blogSchema = require('../schema/blogpost');
var Blog = mongoose.model('Blog', blogSchema);

class AddBlogPost{

    async getSchemaDetails(req,res){
        const post = new Blog({title : 'Post related to tech',author : "Khushal Goyal", body:'Post related to tech'})
        let postsave = await post.save();
        res.json({message : "Hello"})
    }
    
    addBlogDetails(req,res){
        console.log(res.body);
        res.json({message : "Add Blog details"})
    }
}

module.exports = AddBlogPost;