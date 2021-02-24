const express = require('express')
const Router = express.Router()
const {check, validationResult} = require('express-validator')
const Order = require('../models/order')
const {initialize, sendOTP, validateOTP, process} = require('../helpers/paytmAPI')
const config = require('../helpers/paytmconfig')
const https = require('https');

Router.post('/initialize', async (req, res) => {

    var orderTotal = await totalOrders()

    

    var cart = req.session.cart
    // Route for making payment
    if(cart.length === 0) 
    return res.status(400).send("Please add something to cart")

    var paymentDetails = {
        customerId: req.body.mobile,
        customerName: req.body.name,
        customerEmail: req.body.email,
        customerPhone: req.body.mobile
    }

    var total = 0
    cart.forEach(item => { total += item.amount })

    initialize({
        orderId: "ORDER_" + (3000 + orderTotal) + "_" + Date.now(),
        callbackUrl: "https://rhombuseducation.com/api/payment/callback",
        txnAmount: total,
        customerId: "CUST_001",
    }, (result, orderId) => {
        res.send({...result, orderId})
    })

})

Router.post('/payWithWallet', async (req, res) => {

    sendOTP({
        mobile: req.body.mobile,
        orderId: req.body.orderId,
        txnToken: req.headers.txn_token
    }, (result, orderId) => {
        res.send({...result, orderId})
    })

})

Router.post('/validateotp', (req, res) => {

    validateOTP({
        otp: req.body.otp,
        orderId: req.body.orderId,
        txnToken: req.headers.txn_token
    }, (result, orderId) => {
        res.send({...result, orderId})
    })
    
})


Router.post('/process', (req, res) => {


    process({
        orderId: req.body.orderId,
        txnToken: req.header.txn_token,
    }, req.body.paymentOptions, (result) => {
        res.send(result)
    })


})

Router.post("/callback", async (req, res) => {
    // Route for verifiying payment

    var post_data = req.body
    // received params in callback

    // verify the checksum
    var checksumhash = post_data.CHECKSUMHASH;
    // delete post_data.CHECKSUMHASH;
    var result = checksum_lib.verifychecksum(post_data, config.PaytmConfig.key, checksumhash);
    console.log("Checksum Result => ", result, "\n");

    if(result){
        Order.updateOne({_id: post_data["ORDERID"]}, {$set:{
            status: post_data["STATUS"],
            meta: post_data
        }}).then(async txn => {
            const order = await Order.findOne({_id: post_data["ORDERID"]})
            res.render('status-page', {
                icon: post_data["STATUS"] === "TXN_SUCCESS" ? "success" : "error",
                title: post_data["STATUS"] === "TXN_SUCCESS" ? "Transaction Success" : "Transaction Failed",
                info: post_data["STATUS"] === "TXN_SUCCESS" ? "Your order has been successfully completed. Please check your mail id to get the details of the order." : "We are sorry! Your transaction has been declined by the bank.",
                ...req.pageData
            })
        })
    }
    else{
        Order.updateOne({_id: post_data["ORDERID"]}, {status: "Failed"}).then(result => {
            res.render('status-page', {
                icon: "error",
                title: "Transaction Failed",
                info: "There was some unknown error. Please contact our customer support.",
                ...req.pageData
            })
        })
    }


    
  });
