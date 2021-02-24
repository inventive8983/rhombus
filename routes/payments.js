const express = require('express')
const mongoose = require('mongoose')
const Router = express.Router()
const {check, validationResult} = require('express-validator')
const Order = require('../models/order')
const Razorpay = require('../controllers/razorpay');
const createUser = require('../helpers/createUser');
const User = require('../models/user')


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
    check("password", "Password is required").exists(),
    check("cnfrmPassword", "Please confirm your password").exists(),
    check("state", "Please enter a state").exists(),
    check("pincode", "Please enter a valid pincode").isNumeric().isLength(6),
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

Router.post('/initialize', validate, totalOrders, totalAmount, async (req, res) => {
    
    if(req.isAuthenticated()){
        var currentUser = req.session.passport.user
    }
    else{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).send(errors.array()[0].msg);
        }

        const passwordMatch = req.body.password === req.body.cnfrmPassword
    if(!passwordMatch) return res.status(400).send("Password does not match")
        //Creating User
        var newUser = {
            name:req.body.name,
            mobile: req.body.mobile,
            email: req.body.email,
            addresses: [{
                street: req.body.address,
                city: req.body.city,
                state: req.body.state,
                country: req.body.country,
                pincode: req.body.pincode
            }],
            password: req.body.password,
            defaultPaymentMethod: req.body.paymentOption
        }

        var currentUser = await createUser(newUser)
        if(!currentUser) return res.status(400).send("You are an existing user. Please login to continue.")
    }

    Order({
        _id: new mongoose.Types.ObjectId(),
        name: currentUser.name,
        phone: currentUser.mobile,
        email: currentUser.email,
        userId: currentUser._id,
        date: Date.now(),
        billingAddress: currentUser.addresses[0].street,
        city: currentUser.addresses[0].city,
        state: currentUser.addresses[0].state,
        country: currentUser.addresses[0].country,
        pincode: currentUser.addresses[0].pincode,
        totalAmount: req.totalAmount,
        orderId: "RHOMBUS_" + (req.totalOrders + 3000) + Date.now(),
        items: req.session.cart,
    }).save().then(result => {

        //Send Order Id
        res.status(200).send({
            message: "Redirecting...",
            paymentOption: currentUser.defaultPaymentMethod,
            order: result
        })

    }).catch(err => {
        res.status(400).send("Some error occured. Please contact support.")
    })

})


//Webhhooks & Callback
Router.post('/razorpay', Razorpay.webhook)



module.exports = Router