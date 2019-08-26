const express = require('express');
let router = express.Router();

const HandlerGenerator = require('../contollers/handler')

let handlers = new HandlerGenerator()
let middleware = require('../contollers/middleware')

router.get('/api/login',handlers.login)

router.post('/refresh',handlers.refresh_token)


module.exports = router;