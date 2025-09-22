const mysql = require('mysql2');
require('dotenv').config(); 
const fs = require('fs');

const config ={
uri:process.env.DB_URI,
  ssl: {
    ca: fs.readFileSync(__dirname + "/ca.pem"),
    rejectUnauthorized: true
  },
};

const pool=mysql.createPool(config);

module.exports = pool.promise();

