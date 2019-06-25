const express = require('express');
let router = express.Router();

const HandlerGenerator = require('../contollers/handler')

let handlers = new HandlerGenerator()
let middleware = require('../contollers/middleware')

router.post('/login',handlers.login)

router.get('/home',middleware.checkToken, handlers.index)

router.post('/refresh',handlers.refresh_token)


module.exports = router;