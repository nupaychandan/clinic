const net = require('net');
const jwt = require('jsonwebtoken');
const db = require("../models");
const sequelize = db.sequelize;
var sockets = [];


exports.login = async(req,res, next)=>{
  console.log("login data*******",req.body);
  const sqlQuery = 'sp_loginTest  :EmailId, :Password';
  const result = await sequelize.query(sqlQuery, { replacements: {EmailId: req.body.emailId,Password:req.body.password}});
  console.log("result-sp_Login*****",result);
  if(result && result[0].length) {
    const accessTokenSecret = process.env.JWT_SECRET;
    const token = jwt.sign({EmailId: req.body.emailId, Password:req.body.password}, accessTokenSecret);
    res.send({status:true, result:result[0], token});
  }
  else {
    res.send({status:false, result:[], token:""});
  }
  
}

exports.generateToken = async (req, res) => {
  const accessTokenSecret = process.env.JWT_SECRET;
  const token = jwt.sign({ username: 'admin'},accessTokenSecret);
  res.send({status:true, token:token});
};

exports.getTestAuth = async (req, res) => {
  // const token = jwt.sign({ username: 'admin'},'welcome');
  res.send({status:true, data:"OK"});
};
