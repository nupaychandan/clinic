
require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const net = require('net');
var CryptoJS=require('crypto-js');
const { text } = require('body-parser');

const app = express();
var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));
var sockets = [];
const server = net.createServer();
server.listen(443, () => {
  //console.log('TCP Server is running on port ' + port + '.');
});

encKey = "We1c0mein10*";

const enc = 'This is test.';

function aesEncrypt(data) {

  const key = CryptoJS.enc.Utf8.parse(this.encKey);
  const iv = CryptoJS.enc.Utf8.parse(this.encKey);

    let cipher = CryptoJS.AES.encrypt(data, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });
    return cipher.toString();
}


function aesDecrypt(data) {

  const key = CryptoJS.enc.Utf8.parse(this.encKey);
  const iv = CryptoJS.enc.Utf8.parse(this.encKey); 

  let cipher = CryptoJS.AES.decrypt(data, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
  });
  return cipher.toString(CryptoJS.enc.Utf8);
}

const encryptedText = aesEncrypt(enc);
const decryptedText = aesDecrypt(encryptedText);


console.log('Encrypted Text - ' + encryptedText);
console.log('Decrypted Text - ' + decryptedText);
// simple route
app.get("/", (req, res) => {
  

  });

 

app.post("/", (req, res) => {
  console.log("data*******",req.body);
  data = req.body.data;
  // const sqlQuery = 'sp_setdevicedata :message, :ip';
  // const result = await sequelize.query(sqlQuery, { replacements: {message: req.body.token, ip: req.body.ip}});
  // console.log("result-sp_insertToken*****",result);
  res.send({status:true, result:data});
});

require("./app/routes/routes")(app);

const PORT = 8124;
app.listen(PORT, () => {
  console.log(`Server is running on port 8124.`);
});