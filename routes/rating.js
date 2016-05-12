var express = require('express');
var router = express.Router();
var teacherDal = require('../model/teacher_dal');
var classDal = require('../model/class_dal');


router.get('/', function (req, res) {

    teacherDal.GetByID(req.query.teacher_id, function (err, result) {
            if (err){
                res.send("Error: " + err);
            }
        else {
                if(req.session.account === undefined) {
                    res.render('getNewTeacherRating.ejs', {teachers: result, title: 'On Pointe', teacher_id: req.query.teacher_id});
                }
                else {
                    res.render('getNewTeacherRating.ejs', {
                        teachers: result,
                        title: 'On Pointe',
                        first_name: req.session.account.first_name,
                        teacher_id: req.query.teacher_id,
                        teachers_name: req.query.first_name
                    });
                }
            }
        }
    );
});

router.get('/newTeacherRating', function(req, res, next) {

    teacherDal.InsertRating(req.session.account.student_id, req.query.teacher_id, req.query.teacher_rating, function(err, result){
        var response = {};
        if(err) {
            response.message = "You've already rated this teacher!"
        }
        else {
            response.message = 'Thank you for your submission!';
        }
        res.json(response);
    });
});


router.get('/classRating', function (req, res) {

    classDal.GetByID(req.query.class_id, function (err, result) {
            if (err){
                res.send("Error: " + err);
            }
            else {
                if(req.session.account === undefined) {
                    res.render('getNewClassRating.ejs', {classes: result, title: 'On Pointe', class_id: req.query.class_id});
                }
                else {
                    res.render('getNewClassRating.ejs', {
                        classes: result,
                        title: 'On Pointe',
                        first_name: req.session.account.first_name,
                        class_id: req.query.teacher_id,
                        class_name: req.query.class_title
                    });
                }
            }
        }
    );
});


router.get('/newClassRating', function(req, res, next) {

    classDal.InsertRating(req.session.account.student_id, req.query.class_id, req.query.class_rating, function(err, result){
        var response = {};
        if(err) {
            response.message = "You've already rated this class!"
        }
        else {
            response.message = 'Thank you for your submission!';
        }
        res.json(response);
    });
});
module.exports = router;