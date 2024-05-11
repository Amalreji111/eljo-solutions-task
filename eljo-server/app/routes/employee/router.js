const express = require('express');
const app = new express.Router();
const { 
    EmployeeController
} = require('../../controllers');
const { verifyToken, isEmployer } = require('../../middlewares/middleware');


app.get('/list',verifyToken,isEmployer,EmployeeController.list)

app.get('/detail',verifyToken,EmployeeController.detail)

app.put('/update',verifyToken,EmployeeController.update)
app.delete('/',verifyToken,isEmployer,EmployeeController.deleteEmployee)

module.exports = app