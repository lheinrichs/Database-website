var express = require('express');
var router = express.Router();
var userDal = require('../model/user_dal');
var teacherDal = require('../model/teacher_dal');
var classDal = require('../model/class_dal');

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'On Pointe' });
});


/*get home page */
router.get('/home', function(req, res, next) {
  classDal.GetSchedule(function (err, result) {
    if (err) {
      res.send("Error: " + err);
    }
    else {
      if (req.session.account === undefined) {
        res.render('home.ejs', {classSchedule: result, title: 'On Pointe'});
      }
      else {
        res.render('home.ejs', {
          classSchedule: result,
          title: 'On Pointe',
          first_name: req.session.account.first_name
        });
      }
    }
  });
});


router.get('/authenticate', function(req, res) {
  userDal.GetByEmail(req.query.email, req.query.password, function (err, account) {
    var response = {};
    if (err) {
       response.message = err.message;
    }
    else if (account == null) {
      res.send("Account not found.");
    }
    else {
      
      req.session.account = account;
      //res.send(account);
      response.message ="success!";
    }
    res.json(response);

  });
});

/*sign up */

router.get('/signup', function(req, res) {
  console.log("signing up!");
  userDal.InsertUser(req.query.first_name, req.query.last_name, req.query.email, req.query.password, function(err, result) {
    var response = {};

    if(err) {
      response.message = "Sign up was not successful, please try again";
     
    }
    else {
      response.message = 'Sign up successful!';
      
    }
    res.json(response);

  });
});

router.get('/newMember', function(req, res) {
  res.render('signup');
});

router.get('/signup_success', function(req,res) {
  res.render('signup_success');
});


router.get('/teacherRating', function(req,res){

  teacherDal.GetAll( function(err, result){
    if(err) {
      res.send("Error: " + err);
    }
    else {
      if(req.session.account === undefined) {
        res.render('teacherRating.ejs', {teachers: result, title: 'On Pointe'});
      }
      else {
        res.render('teacherRating.ejs', {
          teachers: result,
          title: 'On Pointe',
          first_name: req.session.account.first_name
        });
      }
    }
  });
});

router.get('/classRating', function(req, res){
  classDal.GetAll( function(err, result) {
    if (err) {
      res.send("Error: " + err);
    }
    else {
      if (req.session.account === undefined) {
        res.render('classRating.ejs', {classes: result, title: 'On Pointe'});
      }
      else {
        res.render('classRating.ejs', {
          classes: result,
          title: 'On Pointe',
          first_name: req.session.account.first_name
        });
      }
    }
  });
});

router.get('/averageRating', function(req,res){
  classDal.GetAllAverageRatings( function(err, result) {
    if (err) {
      res.send("Error: " + err);
    }
    else {
      if (req.session.account === undefined) {
        res.render('averageRating.ejs', {avgClasses: result, title: 'On Pointe'});
      }
      else {
        res.render('averageRating.ejs', {
          avgClasses: result,
          title: 'On Pointe',
          first_name: req.session.account.first_name
        });
      }
    }
  });
});



router.get('/logout', function(req, res) {
  req.session.destroy( function(err) {
    res.render('logout.ejs');
  });
});


module.exports = router;
