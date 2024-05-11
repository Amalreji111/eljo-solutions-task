const { BASE_URL } = require("../config/config");
const userRoute = require('./auth/router');
const employeeRoute = require('./employee/router');
module.exports = (app) => {
    app.use(BASE_URL + '/user', userRoute);
    app.use(BASE_URL + '/employee', employeeRoute);
  };