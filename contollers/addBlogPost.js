const mongoose = require('mongoose');

const blogSchema = require('../schema/blogpost');
var Blog = mongoose.model('Blog', blogSchema);

class AddBlogPost{

    getBlogs(req,res){
        Blog.find({}).lean().exec(function(err,res_){
            res.json(res_)
        })
    }
    
    async addBlogDetails(req,res){
        const post = new Blog({title : req.body.title,author : req.body.author, body:req.body.body, hidden : req.body.hidden, coverphotolink : req.body.coverphoto})
        let postsave = await post.save();
        res.status(200).json({message : "Blog added successfully."})
    }

    voteForFavorite(req,res){
        try{
           const query = {meta : {favs : 1}}
           const doc =  Blog.findOne({_id : req.body.id},function(err,blog){
               if(!blog.meta.favs){
                   blog.meta.favs = 1
               }else{
                   blog.meta.favs = blog.meta.favs + 1
               }
               blog.save(function(err,res_){
                   if(err){
                       res.json(err)
                   }else{
                       res.status(200).json({message : "Added as Favorite."})
                   }
               })
           });
        }catch(err){
            console.log(err)
        }

    }

    dummyAPI(req,res){
        res.json({message : "Hello"});
    }
}

module.exports = AddBlogPost;