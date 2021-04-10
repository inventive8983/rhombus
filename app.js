const express = require('express')
const app = express()
const https = require('https')
const { default: axios } = require('axios');
//requiring  basic middlewares
const mongoose = require('mongoose');
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const path = require("path");
const morgan = require('morgan')

require('dotenv').config()

// Config Passport
require("./config/passport")(passport);



//database
const {connectionDB} = require('./config/db')

app.use('/static', express.static('static'))
app.use('/media', express.static('media'))
app.use('/template', express.static('template'))
app.use('/admin', express.static(path.join(__dirname, 'admin', 'build')))


app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

//using basic middlwares
app.use(express.json({extended: false}))
app.use(express.urlencoded({extended: false}))

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
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.get('/restart', (req, res) => {

  res.send("Servers restarted successfully.")
  execShellCommand("pm2 restart server.js")
  
})

const router = require('./routes/index');


//database connectivity
connectionDB()

//routes middleware
app.use(router)

//exporting the file 
module.exports =app 
