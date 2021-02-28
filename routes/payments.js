const express = require('express')
const mongoose = require('mongoose')
const Router = express.Router()
const {check, validationResult} = require('express-validator')
const Order = require('../models/order')
const Razorpay = require('../controllers/razorpay');
const createUser = require('../helpers/createUser');
const User = require('../models/user')
const { sendMail } = require('../helpers/mail')
const jwt  = require('jsonwebtoken')


const totalOrders = async (req, res, next) => {
    var data = await Order.find({})
    req.totalOrders = data.length
    next()
}

const validate = [
    check("name", "Please enter a valid name").isLength({min: 3}),
    check("email", "Please enter a valid email").isEmail(),
    check("mobile", "Please enter a valid mobile number").isNumeric().isLength({max: 10}),
    check("address", "Address field is required").exists(),
    check("city", "Please enter a city").exists(),
    check("state", "Please enter a state").exists(),
    check("pincode", "Please enter a valid pincode").isNumeric().isLength(6),
    check("code", "Please enter a valid code").isNumeric().isLength(6),
]

const totalAmount = (req, res, next) => {
    var cart = req.session.cart
    // Route for making payment
    if(cart.length === 0) 
    return res.status(400).send("Please add something to cart")

    var total = 0
    cart.forEach(item => { total += item.amount })

    req.totalAmount = total
    next()

}

const getOrder = (req, res, next) => {
    
    Order.findOne({_id: req.query.orderId}).then(order => {

        req.oderId = order.orderId
        req.totalAmount = order.totalAmount
        req.userId = order.userId
        req.userEmail = order.email
        req.userMobile = order.phone
        next()

    }).catch(err => {
        res.sendStatus(400)
    })

}

Router.get('/', getOrder, (req, res) => {
    
    if(req.query.mode === 'PAYTM'){
        res.send('This is paytm gateway')
    }
    else{
        Razorpay.createOrder(req, res)
    }

})

Router.post('/verifyemail', [check("email", "Please enter a valid email").isEmail()], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }

    const code = Math.floor(Math.random() * 1000000);

    jwt.sign({
        data: {email: req.body.email, code}
    }, 'checkout-verify', { expiresIn: '1h' }, (err, token) => {
        if(err) throw err
        sendMail(req.body.email, "Verify checkout details", `The code is ${code}`)
        res.send({
            message: "Sent an email to your inbox.",
            token
        })
    });

})

Router.post('/initialize', validate, totalOrders, totalAmount, async (req, res) => {
    
    console.log(req.body);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors.array()[0].msg);
        return res.status(400).send(errors.array()[0].msg);
    }

    jwt.verify(req.body.token, 'checkout-verify', async function(err, decoded) {

        if(err) throw err

        console.log(decoded);

        if(req.body.code === `${decoded.data.code}`){

            Order({

                _id: new mongoose.Types.ObjectId(),
                name:req.body.name,
                phone: req.body.mobile,
                email: req.body.email,
                date: Date.now(),
                billingAddress: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                pincode: req.body.pincode,
                totalAmount: req.totalAmount,
                orderId: "RHOMBUS_" + (req.totalOrders + 3000) + Date.now(),
                items: req.session.cart,
        
            }).save().then(result => {
        
                //Send Order Id
                res.status(200).send({
                    message: "Redirecting...",
                    paymentOption: "OTHER",
                    order: result
                })
        
            }).catch(err => {
                res.status(400).send("Some error occured. Please contact support.")
            })

        }
        else{
            console.log("Hey");
            res.status(400).send("Invalid Code")
        }
    });

    // if(req.isAuthenticated()){
    //     var currentUser = req.session.passport.user
    // }
    // else{
    //     

    //     var newUser = {
    //         name:req.body.name,
    //         mobile: req.body.mobile,
    //         email: req.body.email,
    //         addresses: [{
    //             street: req.body.address,
    //             city: req.body.city,
    //             state: req.body.state,
    //             country: req.body.country,
    //             pincode: req.body.pincode
    //         }],
    //         defaultPaymentMethod: "OTHER"
    //     }

    //     var currentUser = await createUser(newUser)
    //     if(!currentUser) return res.status(400).send("You are an existing user. Please login to continue.")
    // }

})


//Webhhooks & Callback
Router.post('/razorpay', Razorpay.webhook)



module.exports = Router