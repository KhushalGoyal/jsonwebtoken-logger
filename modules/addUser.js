const express = require('express');
let router = express.Router();

const AddUser = require('../contollers/addUser');

let adduser = new AddUser();

router.get('/addUser',adduser.addUser);

router.get('/getUser',adduser.getUser);

module.exports = router;