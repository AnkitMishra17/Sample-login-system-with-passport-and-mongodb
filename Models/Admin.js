const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let adminSchema = new mongoose.Schema({
  Name: String,
  password: String
});

let Admin = mongoose.model('Admin', adminSchema);

// Creating the Admin and Encrypting the password

/*
var admin1 = new Admin({ Name: 'dr.test', password:'test123' });

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(admin1.password, salt, (err, hash) => {
    if (err) throw err;
    admin1.password = hash;
    admin1
      .save()
      .then(user => {
        console.log('saved');
          })
      .catch(err => console.log(err));
    });
});
*/
module.exports = Admin;
