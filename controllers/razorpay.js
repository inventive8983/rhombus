const Razorpay = require('razorpay');
const https = require('https');
const crypto = require('crypto');
const updateOrder = require('../helpers/updateOrder');
const secret_key = 'my-secret-is-nothing' 
const Order = require('../models/order');
const { sendMail, sendMailWithTemplate } = require('../helpers/mail');

const razorpay = new Razorpay({
    key_id: 'rzp_test_mBfTcQewtdvFRL',
    key_secret: 'Dx9gMz9fqOmuXqKZpSC701ID'
})

module.exports.createOrder = async (req, res) => {

    

    const options = {
        amount: req.totalAmount * 100,
        currency: 'INR',
        receipt: req.orderId, //any unique id
        payment_capture: 1,
    }

    try {

        const paymentOrder = await razorpay.orders.create(options)

        var req_options = {
        'method': 'POST',
        'hostname': 'api.razorpay.com',
        'path': '/v1/checkout/embedded',
        'headers': {
            'Content-Type': 'application/json'
        },
        'maxRedirects': 20
        };

        await Order.updateOne({_id: req.query.orderId}, {$set: {orderId: paymentOrder.id}})

        var request = await https.request(req_options, function (response) {

            var chunks = [];

            response.on("data", function (chunk) {
                chunks.push(chunk);
            });

            response.on("end", function (chunk) {
                var body = Buffer.concat(chunks);
                res.send(body.toString())
            });

            response.on("error", function (error) {
                console.error(error);
            });
            });
            
            var postData = JSON.stringify({

                "key_id":"rzp_test_mBfTcQewtdvFRL",
                "order_id": paymentOrder.id,
                "name":"Rhombus Education",
                "calback_url":"https://rhombuseducation.com/transaction/successful",
                "cancel_url": "https://rhombuseducation.com/checkout",
                "prefill": {
                    "contact": req.userMobile,
                    "email": req.userEmail,
                },
        });

        request.write(postData);
        request.end();

    } catch (error) {
        console.log(error);
        res.status(400).send('Unable to create order');
    }

}


module.exports.webhook = async (req, res) => {

    // do a validation
    const data = crypto.createHmac('sha256', secret_key)
    data.update(JSON.stringify(req.body))
    const digest = data.digest('hex')
    if (digest === req.headers['x-razorpay-signature']) {

        updateOrder(
            req.body.payload.payment.entity.order_id, 
            req.body.payload.payment.entity.status === "captured" ? "TXN_SUCCESS" : "TXN_FAILED", 
            req.body.payload.payment.entity.contact,
            req.body.payload.payment.entity
        ).then((result) => {
            res.json({
                status: 'ok'
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 'ok'
            })
        })
        
    } else {
        res.status(400).send('Invalid signature. Please contact our customer support.');
    }

}

module.exports.failure = (req, res) => {

    // do a validation
    const data = crypto.createHmac('sha256', secret_key)
    data.update(JSON.stringify(req.body))
    const digest = data.digest('hex')
    if (digest === req.headers['x-razorpay-signature']) {

        sendMailWithTemplate(req.body.payload.payment.entity.email, "Payment Failed", {
            name: '',
            html: "Your payment with Rhombus Education was failed due to some error. Please contact our support for help. Your order ID is: " + req.body.payload.payment.entity.order_id,
            action: "Contact Us",
            link:"https://rhombuseducation.com/contact"
        }).then((result) => {
            res.json({
                status: 'ok'
            })
        }).catch(err => {
            console.log(err);
            res.json({
                status: 'ok'
            })
        })
        
    } else {
        res.status(400).send('Invalid signature. Please contact our customer support.');
    }

}