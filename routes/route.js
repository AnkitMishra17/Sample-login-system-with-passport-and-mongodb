const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const Admin = require('../Models/Admin');
const Applicant = require('../Models/Applicants');
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlencodedparser = bodyparser.urlencoded({extended:false});

router.get('/',forwardAuthenticated,(req, res)=>{
    res.render('login');
  });

router.post('/',urlencodedparser, (req,res,next)=>{
    console.log(req.body);
    passport.authenticate('local', { successRedirect: '/dashboard',
                                failureRedirect: '/login',
                                failureFlash: true })(req,res,next);
  });

router.get('/dashboard', ensureAuthenticated, (req, res) =>{
    Applicant.find({}, (err,data)=>{
      if (err) throw err;
      res.render('dashboard',{'info' : data});
    });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;
