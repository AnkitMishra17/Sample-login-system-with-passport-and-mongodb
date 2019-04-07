const Admin = require('../Models/Admin');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'Name' }, (Name, password, done) => {
      // Match user
      Admin.findOne({
       Name: Name
     }).then(admin => {
        if (!admin) {
          return done(null, false, console.log('Invalid username try dr.test'));
        }

        // Match password
        bcrypt.compare(password, admin.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            return done(null, admin);
          } else {
            return done(null, false, console.log('Password invalid try test123'));
          }
        });
      });
    })
  );


  passport.serializeUser(function(admin, done) {
    done(null, admin.id);
  });

  passport.deserializeUser(function(id, done) {
    Admin.findById(id, function(err, admin) {
      done(err, admin);
    });
  });
};
