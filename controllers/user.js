const { handleError } = require('../helpers/errorHandler')
const  { validationResult } = require('express-validator')
const mongoose = require('mongoose');
const passport = require("passport");
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const User  = require('../models/user')


//signUP  controller 
exports.signUp = async (req, res) =>{
  
    // //IF EMAIL ALREADY EXIST
    const emailExist = await User.findOne({email: req.body.email})
    if(emailExist) return res.status(400).send('Email Already Exist')

    //Hass Password
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)
    
    
    const newUser = new User ({

        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashPassword
    })    

    if(!emailExist){
        await newUser.save().then(result => {
            console.log(result)
            res.send(result)
            })   
            .catch(err =>{
                console.log("Catch")
                res.json({
                    message: err
                })
            } )   
    }
  
}

//singin  controller
exports.signin = async (req,res, next)=>{
     
    passport.authenticate('client', {
        session: true
        }, (err, user,info) => {
            if(err) return next(err)
            req.logIn(user, async function(err) {
            if (err) { return next(err) }         
            if (!user) { 
                return res.status(400).send({
                type: 'error',
                "message": info.message,
                "data": null
                }) 
            }
            res.send({
                type: 'success',
                "message": "Log In Successful",
                "data":  req.session.passport
                })
            
            })
        })(req, res, next) 
}


//signout controller
exports.signout = async(req, res)=>{

    req.logout()
    req.session.destroy((err)=>{
        if(err) console.log(err);
    })
    res.redirect('/')
}
