require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
var express = require("express");
var app = express();
const genres = require('./routes/genres');
const users = require('./routes/users');
const auth = require('./routes/auth');
const day2day = require('./routes/day2day');
const notepad = require('./routes/notepad');
//const dbconnection = require('./models/dbconnection');
const mongoose = require('mongoose');



winston.handleExceptions(
	new winston.transports.File({filename: 'uncaughtException.log'})
);

process.on('unhandledRejection', (ex) => {
	throw ex;
});



winston.add(winston.transports.File, { filename: 'logfile.log' }); 

/* mongodb://tanmoy:tanmoy@127.0.0.1:27017/dressbook */ //----------AWS
/* mongodb://tanmoyroy:tanmoyroy123@ds149144.mlab.com:49144/daytwoday */ //----------MLAB tanmoyroy99@gmail.com



mongoose.connect('mongodb://tanmoyroy:tanmoyroy123@ds149144.mlab.com:49144/daytwoday',{ useNewUrlParser: true })
.then(()=> {console.log('DB connected...');
	next();
})
.catch(err=> {
	console.error(err);
});

/* -------------------------------------------------------------------------------------------------- */
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-auth-token");
  next();
});
/* -------------------------------------------------------------------------------------------------- */

app.use(express.json());
app.use('/api/genres',  genres);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/day2day', day2day);
app.use('/api/notepad',notepad)
app.use(error);


const port = process.env.PORT || 8080;
app.listen(port,function(){
    console.log(`Listening on port ${port}...`)
});
