'use strict';

const host = process.env.stage.dbHost||'localhost'; 
const user = process.env.stage.dbUser||'user'; 
const password = process.env.stage.dbPass||'password';
const dataBase = process.env.stage.db||'db';


const Promise = require('bluebird');
const mysql = require('mysql');

const poolConfig={
  connectionLimit: 10,
  host: host,
  user: user,
  password: password,
  database: dataBase
};

const connectionConfig ={
  host: host,
  user: user,
  password: password,
  database: dataBase,
  multipleStatements: true
};

const pool = mysql.createPool(poolConfig);

exports.query = function (query, params) {

    return new Promise(function (resolve, reject) {
        pool.query(query, params, function (err, result) {

            console.log('query from db: ', query);
            if (err) {
                console.log('error caught in db file');
                return reject(err);
            }

            return resolve(result);
        })
    })
};

exports.transQuery = function (query,params){

  const conn = mysql.createConnection(connectionConfig);

  return new Promise(function(resolve,reject){

    conn.query(query,params,function(err,result){
      conn.end();

      if(err){
        console.log('error while executing query');
        return reject(err);
      }

      return resolve(result);
    });

  })

}