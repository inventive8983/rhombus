const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const User = require('../models/user')
const Admin = require('../models/admin')

module.exports = function(passport) {

    passport.use('client',
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            
            User.findOne({ email: email }).then(user => {
                if (!user) {
                    return done(null, false, { message: 'Incorrect email.' });
                }
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err){
                        console.log(err)
                    }

                    if(isMatch){
                        return done(null, user);
                    } 
                    else{
                        return done(null, false, {message: 'Incorrect Password'})
                    } 
                })
            })
        })
    )

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
      
    passport.deserializeUser(function(id, done) {
        User.findById({_id: id}, function(err, user) {
          done(err, user);
        });
    });
    
}