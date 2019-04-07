const mongoose = require('mongoose');

let applicantSchema = new mongoose.Schema({
  Name: String,
  Username: String,
  Status: Boolean,
  Date: {type : Date, default: Date.now}
});

let Applicant = mongoose.model('Applicant', applicantSchema);

// SAVING APPLICANTS MANUALLY

/*
  var applicant = new Applicant({ Name: 'Ankit Mishra', Username: 'ankit17', Status: true }).save((err)=>{
    if (err) return console.error(err);
    console.log('Applicant saved');
  })
*/

module.exports = Applicant;
