var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT * from teachers;"
    connection.query(qry, function(err, result){
        callback(err, result);
    });
};


exports.GetByID = function(teacher_id, callback) {

    var query = 'SELECT * FROM teachers WHERE teacher_id=' + teacher_id;
    connection.query(query,
        function (err, result) {
            if(err) {
                console.log(err);
                callback(true);
                return;
            }
            callback(false, result);
        }
    );
};


exports.InsertRating = function(student_id, teacher_id, teacher_rating, callback) {

    var qry = "INSERT INTO student_rates_teachers (student_id, teacher_id, rating) VALUES (?, ?, ?)";
    connection.query(qry, [student_id, teacher_id, teacher_rating], function(err, result){
        callback(err, result);
    });



}