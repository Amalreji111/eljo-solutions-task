const express = require('express');
const app = new express.Router();
const { 
    EmployeeController
} = require('../../controllers');
const { verifyToken, isEmployer } = require('../../middlewares/middleware');
const multer = require("multer");
const path = require('path');
const storage = multer.memoryStorage({
    destination: './public/uploads/images',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + 
    path.extname(file.originalname));
    }
});
const upload = multer({storage: storage});



app.get('/list',verifyToken,isEmployer,EmployeeController.list)

app.get('/detail',verifyToken,EmployeeController.detail)

app.put('/update',upload.single('file'),verifyToken,EmployeeController.update)
app.delete('/',verifyToken,isEmployer,EmployeeController.deleteEmployee)

module.exports = app