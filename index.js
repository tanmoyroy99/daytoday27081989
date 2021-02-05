require('express-async-errors');
require('dotenv').config();
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

const db_user     = process.env.MONGO_DB_USER;
const db_password = process.env.MONGO_DB_PASSWORD;
const db_name     = process.env.MONGO_DB;
const db_host     = process.env.MONGO_DB_HOST;

mongoose.connect(`mongodb+srv://${db_user}:${db_password}@${db_host}/${db_name}?retryWrites=true&w=majority`,{ useNewUrlParser: true })
.then(()=> {console.log('DB connected...');
	// next();
})
.catch(err=> {
	console.error("DB Connection Failed: ",err);
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
app.use('/api/day2day',auth, day2day);
app.use('/api/notepad',auth,notepad);
app.use(error);


const port = process.env.PORT || 8080;
app.listen(port,function(){
    console.log(`Listening on port ${port}...`)
});
