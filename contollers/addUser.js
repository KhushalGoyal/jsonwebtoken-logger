const mongoose = require('mongoose');

const userSchema = require('../schema/user');
var User = mongoose.model('User', userSchema);

class AddUser{

    async getUser(req,res){
      User.find({'username':'rahul','password' : 'password'}).lean().exec(function (err, elem){
        if (err) return handleError(err);
        console.log(elem);
        res.json(elem)
      })
    }
    
    async addUser(req,res){
      const user = new User({firstname:"Rahul",lastname:"Kumar",role:"User",password:"password",username:"rahul"})
      let user_ = await user.save();
      res.status(200).json({message: "User added successfuly"})
    }
}

module.exports = AddUser;