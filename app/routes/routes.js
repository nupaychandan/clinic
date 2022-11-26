module.exports = app => {
    const auth = require('../middlewares/jwt-auth');
    var router = require("express").Router();
    const cntl = require("../controllers/controller.js");
    //***************************************************
    //Common Used
    //***************************************************
    router.get("/generateToken", cntl.generateToken);

    router.get("/getlogs",auth, cntl.getTestAuth);
    
    router.post("/login", cntl.login);
  
    //***************************************************

    app.use('/api', router);
    
    //***************************************************
    //***************************************************
    //***************************************************
};