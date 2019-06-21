let jwt = require('jsonwebtoken');
let config = require('../config/config.js');

class HandlerGenerator {
    login (req, res) {
      let username = req.body.username;
      let password = req.body.password;
      // For the given username fetch user from DB
      let mockedUsername = 'admin';
      let mockedPassword = 'password';
      if (username && password) {
        if (username === mockedUsername && password === mockedPassword) {
          let token = jwt.sign({username: username},
            config.secret,
            { 
              expiresIn: '2m' // expires in 24 hours
            }
          );
          let refreshToken = jwt.sign({username: username},
            config.refreshSecret,
            { 
              expiresIn: '3m' // expires in 24 hours
            })
          // return the JWT token for the future API calls
          res.json({
            success: true,
            message: 'Authentication successful!',
            accessToken: token,
            refreshToken: refreshToken
          });
        } else {
          res.send(403).json({
            success: false,
            message: 'Incorrect username or password'
          });
        }
      } else {
        res.send(400).json({
          success: false,
          message: 'Authentication failed! Please check the request'
        });
      }
    }
    index (req, res) {
      res.json({
        success: true,
        message: 'Index page'
      });
    }
    refresh_token(req,res){
      let token = req.query.refresh_token;
      jwt.verify(token, config.refreshSecret, (err, decoded) => {
        console.log(token)
        console.log(config.secret)
        console.log(decoded)
      })
    }
  }

module.exports = HandlerGenerator