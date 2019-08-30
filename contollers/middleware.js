let jwt = require('jsonwebtoken');
const config = require('../config/config.js');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }
  if (token && token != "null") {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

// async function verify(token) {
//   const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: '',  // Specify the CLIENT_ID of the app that accesses the backend
//   });
//   const payload = ticket.getPayload();
//   return payload;
// }

module.exports = {
  checkToken: checkToken,
}