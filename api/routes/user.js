const express = require('express');
const route = express.Router();

const userController = require('../controllers/user');
const authCheck = require('../middleware/jwt-auth');

const User = require ('../models/user');

route.post("/signup",userController.user_signup );

route.post('/login' , userController.user_login);

route.delete("/:userId",authCheck , userController.user_delete);

module.exports = route ;