const express = require('express')
const app = express()

//requiring  basic middlewares
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const path = require("path");
const morgan = require('morgan')
const dotenv = require('dotenv').config()


// Config Passport
require("./config/passport")(passport);



//database
const {connectionDB} = require('./config/db')

app.use('/static', express.static('static'))
app.use('/media', express.static('media'))
app.use('/admin', express.static('admin/build'))

app.use('/template', express.static('template'))

app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

//using basic middlwares
app.use(bodyParser.json({extended: false}))
app.use(bodyParser.urlencoded({extended: false}))

app.use(cookieParser())
app.use(cors());
app.use(morgan('dev'))

// Express Session
app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 24 * 60 * 60
    }),
    cookie: {
      maxAge: 365 * 24 * 60 * 60 * 1000
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());

  //routes
const router = require('./routes/index');
const { extend } = require('lodash');

//database connectivity
connectionDB()

//routes middleware
app.use(router)

//exporting the file 

module.exports =app 
