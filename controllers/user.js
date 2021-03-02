const { handleError } = require('../helpers/errorHandler')
const  { validationResult } = require('express-validator')
const mongoose = require('mongoose');
const passport = require("passport");
const bcrypt = require('bcryptjs')
const jwt  = require('jsonwebtoken')
const User  = require('../models/user')
const Customer  = require('../models/customers')
const generator = require('generate-password');
const { sendMail } = require('../helpers/mail');
const domain = 'http://localhost:4000'
const fs = require('fs');
const convertToCSV = require('../helpers/convertToCSV');
const { verifyOTP } = require('../helpers/sms');


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

exports.isSignedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next()
    }else{
        res.render('login', {...req.pageData})
    }
}

//singin  controller
exports.signin = async (req,res, next)=>{

     
    passport.authenticate('client', {
        session: true
        }, (err, user,info) => {
            if(err){
                return res.status(400).send(info.message)
            }
            else{
                req.logIn(user, async function(err) {
                    if(err){
                        return res.status(400).send(info.message)
                    }else{
                        if (!user) { 
                            return res.status(400).send({
                            type: 'error',
                            "message": info.message,
                            "data": null
                            }) 
                        }else{
                            res.send({
                                type: 'success',
                                "message": "Log In Successful",
                                "data":  req.session.passport
                            })
                        }
                    }   
                })
            }
            })(req, res, next) 
}


//signout controller
exports.signout = async(req, res)=>{

    req.logout()
    res.redirect('/')
}


exports.update = async (req, res) => {

    const data = req.body
    console.log(data);
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }

    User.updateOne({_id: req.session.passport.user._id}, {$set: data}).then(result => {
        if(result.nModified === 1){

            res.send({message: "Successfully Updated"})

        }else{
            res.status(400).send('Failed')
        }
    }).catch(err => {
        console.log(err);
        res.status(400).send('Some error occured.')
    })

}

exports.resetPassword = async (req, res) => {

    const email = req.body.email

    const user = await User.findOne({email})
    if(!user) return res.status(400).send("User does not exist.")

    var password = generator.generate({
        length: 10,
        numbers: true
    });


    jwt.sign({
        data: {id: user._id, password}
    }, 'reset-password', { expiresIn: '1h' }, (err, token) => {
        if(err) throw err
        sendMail(user.email, "Reset your Password", `Your new password is ${password}. Click <a href="${domain}/api/user/password/new?token=${token}">here</a> to reset your password`)
        res.send({message: "Sent an email to your inbox."})
    });


}

exports.newPassword = async(req, res) => {

    const token = req.query.token


    jwt.verify(token, 'reset-password',async function(err, decoded) {

        if(err) throw err

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(decoded.data.password, salt)  

        console.log(decoded);

        await User.updateOne({_id: decoded.data.id}, {
            $set: {"password": hashPassword}
            }).then( result => {
                res.render('login', {...req.pageData})
            }).catch(err => {
                console.log(err);
                res.sendStatus(403)
        })
    });
}

exports.changePassword = async (req, res) => {

    const id = req.session.passport.user

    const match = req.body.password === req.body.password2
    if(!match) return res.status(400).send("Passwords did not match")

     await User.findOne({_id: id}).then(async account => {

        const pass = await bcrypt.compare(req.body.oldpassword, account.password)
        if(!pass) return res.status(400).send("Password is incorrect")

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)  

        await User.updateOne({_id: account._id}, {
            $set: {"password": hashPassword}
            }).then( result => {
                res.send({message: "Changed password successfully."})
            }).catch(err => {
                res.sendStatus(403)
        })

     })

}


exports.resetPasswordFromOTP = async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        return res.status(400).send(errors.array()[0].msg);
    }

    const pass = await verifyOTP(req.body.hashed, req.body.code)
    if(pass.Status !== "Success") return res.status(400).send("Invalid Code")

    if(req.body.password1 !== req.body.password2){
        res.status(400).send("Password did not match.")
    }

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password1, salt)

    User.updateOne({mobile: req.body.mobile}, {$set: {password: hashPassword}}).then((result) => {
        
        if(result.n === 1){
            res.status(200).json({
                message: "Password Updated Successfully."
            })
        }else{
            return res.status(400).send("Failed. May be you entered a wrong phone number.");
        }
    })

 
}


exports.downloadCustomers = async (req, res) => {

    const customers = await Customer.find({});
    var csv = convertToCSV(JSON.stringify(customers))

    fs.writeFile('customers.csv', csv, (err) => {
        if(err) throw err
        res.download('customers.csv', 'customers.csv')
    })
    

}

