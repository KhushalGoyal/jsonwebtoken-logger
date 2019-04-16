const express = require('express');
let router = express.Router();

const HandlerGenerator = require('../contollers/handler')

let handlers = new HandlerGenerator()
let middleware = require('../contollers/middleware')
router.post('/login',handlers.login)

router.get('/',middleware.checkToken, handlers.index)

module.exports = router;