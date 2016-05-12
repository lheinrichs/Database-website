var mysql   = require('mysql');
var db  = require('./db_connection.js');

var connection = mysql.createConnection(db.config);

exports.GetByEmail = function(email, password, callback) {
    var query = 'CALL LoginAuth(?, ?)';
    var query_data = [email, password];

    connection.query(query, query_data, function(err, result) {
        if(err){
            callback(err, null);
        }
        else if(result[0].length == 1) {
            callback(err, result[0][0]);
        }
        else {
            callback(err, null);
        }
    });
};

exports.InsertUser = function(first_name, last_name, email, password, callback) {
    var qry = "INSERT INTO students (first_name, last_name, email, _password) VALUES (?, ?, ?, ?)";
    connection.query(qry, [first_name, last_name, email, password], function(err, result){
        callback(err, result);
    });
};

