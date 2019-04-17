const express = require('express');
const flash = require('connect-flash');
const bodyparser = require('body-parser');
const router = express.Router();
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const app = express();

require('./config/passport')(passport);

mongoose.connect('mongodb://Ankit:ankit123@ds133256.mlab.com:33256/medapp_db', {useNewUrlParser: true }, ()=>{
  console.log('Connection has been made');
});

//.on('error',(err)=>{
//  console.log('Connection Error:',err);
//});
  app.get('/downloadpdf',(req,res)=>{

  res.send('Your file will now be downloaded');
  const conn = mongoose.connection;
  const path = require('path');

  const Grid = require('gridfs-stream');
  const fs = require('fs');

  Grid.mongo = mongoose.mongo;

  conn.once('open',()=>{

  console.log('Your file will now be downloaded');
  const gfs = Grid(conn.db);

  const fs_writestream = fs.createWriteStream(path.join(__dirname,'./downloads/filedownload.pdf'));

  const readStream = gfs.createReadStream({
      filename: 'doctor.pdf'
      });

  readStream.pipe(fs_writestream);

    fs_writestream.on('close',(file)=>{
      console.log('File has been downloaded');
    });
  });
});

app.set('view engine','ejs');
app.use('/assets', express.static('assets'));

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// Global variables
app.use(function(req, res, next) {
  next();
});

app.use('/', require('./routes/route'));
app.listen(process.env.PORT || 5000);
