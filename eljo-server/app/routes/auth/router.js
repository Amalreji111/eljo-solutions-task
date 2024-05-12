const express = require('express');
const app = new express.Router();
const {
    UserController
} = require('../../controllers');
const { verifyToken, isEmployer } = require('../../middlewares/middleware');
const multer = require("multer");
const path = require('path');
const storage = multer.memoryStorage({
    // destination: './public/uploads/images',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
    path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});


app.post('/create-admin', UserController.createAdminAccount)

app.post('/login', UserController.login)
app.post('/register-employee', upload.single('file'), verifyToken,isEmployer, UserController.register)

module.exports = app