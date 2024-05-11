const express = require('express');
const app = new express.Router();
const {
    UserController
} = require('../../controllers');
const { verifyToken, isEmployer } = require('../../middlewares/middleware');
app.post('/create-admin', UserController.createAdminAccount)

app.post('/login', UserController.login)
app.post('/register-employee', verifyToken,isEmployer, UserController.register)

module.exports = app