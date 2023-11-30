//
// database.js
//
// Exports 
// dbConnection: connection object to our MySQL database in AWS RDS
//

const mysql = require('mysql');
const fs = require('fs');
const ini = require('ini');

const config = require('./config.js');

const config_file = ini.parse(fs.readFileSync(config.config_file, 'utf-8'));
const endpoint = config_file.rds.endpoint;
const port_number = config_file.rds.port_number;
const user_name = config_file.rds.user_name;
const user_pwd = config_file.rds.user_pwd;
const db_name = config_file.rds.db_name;

//
// creates connection object, but doesn't open connnection:
//
let dbConnection = mysql.createConnection(
  {
    host: endpoint,
    port: port_number,
    user: user_name,
    password: user_pwd,
    database: db_name,
    multipleStatements: true  // allow multiple queries in one call
  }
);

module.exports = dbConnection;
