const express = require('express')
const mongoose = require('mongoose')
const Router = express.Router()
const {check, validationResult} = require('express-validator')

const http  = require('http')
const Order = require('../models/order')
const checksum_lib = require('../helpers/checksum')
const config = require('../helpers/paytmconfig')


Router.post('/paywithpaytm', [
    check("name", "Please enter a valid name").isLength({min: 3}),
    check("email", "Please enter a valid email").isEmail(),
    check("mobile", "Please enter a valid mobile number").isMobilePhone(),
    check("address", "Address field is required").exists(),
    check("city", "Please enter a city").exists(),
    check("state", "Please enter a state").exists(),
    check("pincode", "Please enter a valid pincode").isNumeric().isLength(6),
], async (req, res) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()[0].msg);
    }

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

    var totalOrders = await Order.find({})
    var totalOrders = totalOrders.length

    var total = 0
    cart.forEach(item => { total += item.amount })

    var d = new Date()
    var date = d.getDate() < 10 ? '0' + d.getDate() : d.getDate()  
    var month = d.getMonth() < 10 ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1)

    const newOrder = new Order({
        _id: new mongoose.Types.ObjectId(),
        orderId: `${totalOrders+3000}${date}${month}${d.getFullYear()}`,
        name: req.body.name,
        phone: req.body.mobile,
        email: req.body.email,
        date: Date.now(),
        billingAddress: req.body.address,
        city: req.body.city,
        state: req.body.state,
        pincode: req.body.pincode,
        totalAmount: total || 1,
        items: req.session.cart,
    })

    newOrder.save().then(result => {
        var params = {};
        params['MID'] = config.PaytmConfig.mid;
        params['WEBSITE'] = config.PaytmConfig.website;
        params['CHANNEL_ID'] = 'WEB';
        params['INDUSTRY_TYPE_ID'] = 'Retail';
        params['ORDER_ID'] = result._id;
        params['CUST_ID'] = paymentDetails.customerId;
        params['TXN_AMOUNT'] = total;
        params['CALLBACK_URL'] = 'https://rhombusedu.herokuapp.com/api/payment/callback';
        params['EMAIL'] = paymentDetails.customerEmail;
        params['MOBILE_NO'] = paymentDetails.customerPhone;

        checksum_lib.genchecksum(params, config.PaytmConfig.key, function (err, checksum) {

            if(err) throw err

            var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
            // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

            var form_fields = "";
            for (var x in params) {
                form_fields += "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
            }
            form_fields += "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";
            console.log(req.session.cart);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write('<html><head><title>Merchant Checkout Page</title></head><body><center><h1>Please do not refresh this page...</h1></center><form method="post" action="' + txn_url + '" name="f1">' + form_fields + '</form><script type="text/javascript">document.f1.submit();</script></body></html>');
            res.end();
        });
    })   
    .catch(err =>{
        console.log(err)
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

  Router.post("/webhook", (req, res) => {
        res.send({data: req.body, status: "Ok"})
  })

module.exports = Router