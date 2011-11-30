#!/usr/bin/env node

var config = require('./config'),
    mysql = require('mysql'),
    mongo = require('mongojs');

var my = mysql.createClient({
  host:     config.mysql.host,
  user:     config.mysql.user,
  password: config.mysql.pass,
  database: config.mysql.database
});

my.on('error', function(){ console.log(arguments); });

var mo = mongo.connect(
  config.mongo.user + ':' +
  config.mongo.pass + '@' +
  config.mongo.host + '/' +
  config.mongo.database,
  [config.mongo.collection]
);

mo[config.mongo.collection].remove({});

var translate = function (err, results, fields) {
  if (err) throw err;
  my.end();
  for (var i = 0; i < results.length; i++) {
    var row = results[i];
    mo[config.mongo.collection].insert(row, function(err, obj){
      if (err) console.log(error);
      console.log(obj[0]._id + ' inserted');
    });
    console.log(row);
  }
}

my.query('SELECT * FROM ' + config.mysql.table, translate);

