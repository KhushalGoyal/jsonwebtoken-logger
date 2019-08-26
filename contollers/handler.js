let jwt = require('jsonwebtoken');
let config = require('../config/config.js');
const mongoose = require('mongoose');
const userSchema = require('../schema/user');
var User = mongoose.model('User', userSchema);

class HandlerGenerator {
    login (req, res) {
      let username = req.query.email;
      let password = req.query.password;

      User.findOne({'username':username,'password' : password},{'username':1,'role':1,'firstname':1,'lastname':1}).lean().exec(function (err, elem){
        if (err) return handleError(err);
        console.log(elem)
        if (elem) {
          if (elem.username) {
            let token = jwt.sign({username: username},
              config.secret,
              { 
                expiresIn: '23hr' // expires in 24 hours
              }
            );
            let refreshToken = jwt.sign({username: username},
              config.refreshSecret,
              { 
                expiresIn: '24hr' // expires in 24 hours
              })
            // return the JWT token for the future API calls
            const json_res = Object.assign({},{
              message: 'Login successful!',
              accessToken: token,
              refreshToken: refreshToken
            },elem)
            res.status(200).json(json_res);
          } else {
            res.status(403).json({
              success: false,
              message: 'Incorrect username or password'
            });
          }
        } else {
          res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
          });
        }
      })
    }
    refresh_token(req,res){
      let refreshToken = req.body.refreshToken;
      jwt.verify(refreshToken, config.refreshSecret, (err, decoded) => {
        if(decoded){
          let accessToken = jwt.sign({username: decoded.username},
            config.secret,
            { 
              expiresIn: '2m' // expires in 24 hours
            }
          );
          res.json({
            success: true,
            message: 'Authentication successful!',
            accessToken: accessToken,
            refreshToken: refreshToken
          })
        }else{
          res.send(401).json({message: "Authentication failed"})
        }
        
      })
    }
  }

module.exports = HandlerGenerator