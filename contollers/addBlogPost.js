const mongoose = require('mongoose');

const blogSchema = require('../schema/blogpost');
var Blog = mongoose.model('Blog', blogSchema);

class AddBlogPost{

    async getSchemaDetails(req,res){
        const post = new Blog({title : 'Post related to tech',author : "Khushal Goyal", body:'Post related to tech'})
        let postsave = await post.save();
        res.json({message : "Hello"})
    }
    
    addUser(req,res){

    }
}

module.exports = AddBlogPost;