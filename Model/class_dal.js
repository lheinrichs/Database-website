var mysql   = require('mysql');
var db  = require('./db_connection.js');

/* DATABASE CONFIGURATION */
var connection = mysql.createConnection(db.config);

exports.GetAll = function(callback){
    var qry = "SELECT * from dance_classes;"
    connection.query(qry, function(err, result){
        callback(err, result);
    });
}


exports.GetByID = function(class_id, callback) {

    var query = 'SELECT * FROM dance_classes WHERE class_id=' + class_id;
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


exports.InsertRating = function(student_id, class_id, class_rating, callback) {

    var qry = "INSERT INTO student_rates_classes (student_id, class_id, rating) VALUES (?, ?, ?)";
    connection.query(qry, [student_id, class_id, class_rating], function(err, result){
        callback(err, result);
    });
}

exports.GetAllAverageRatings = function(callback){
    var qry = "SELECT * from class_avg_rating;"
    connection.query(qry, function(err, result){
        callback(err, result);
    });
}

exports.GetSchedule = function(callback) {
    var qry = "select day_of_week, time_of_day, c.class_title from weekly_schedule s join dance_classes c on c.class_id = s.class_id;"
    connection.query(qry, function(err, result) {
        callback(err, result);
    });
}