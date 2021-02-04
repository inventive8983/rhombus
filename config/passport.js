const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const User = require('../models/user')

module.exports = function(passport) {

    passport.use('client',
        new LocalStrategy({usernameField: 'email'}, (email, password, done) => {
            
            User.findOne({ email: email }, function (err, user) {
                if (err) { return done(err); }
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

     
    passport.serializeUser((user, done) => {
    let userGroup = "user";
  
    const key = {
        user:user,
        userGroup
    }

        done(null, key);
    })

    passport.deserializeUser(function(key, done) {
        User.findById(key.user._id, (err, user) => {
        done(err, user);
    })
    })
    
}