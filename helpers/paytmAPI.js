const PaytmChecksum = require('./checksum')
const config = require('./paytmconfig')
const https = require('https');

exports.initialize = (params, callback) => {
    
    var {orderId, callbackUrl, txnAmount, customerId } = params

    var paytmParams = {};

    paytmParams.body = {
        "requestType"   : "Payment",
        "mid"           : config.PaytmConfig.mid,
        "websiteName"   : "WEBSTAGING",
        "orderId"       : orderId,
        "callbackUrl"   : callbackUrl,
        "txnAmount"     : {
            "value"     : "1.00",
            "currency"  : "INR",
        },
        "userInfo"      : {
            "custId"    : customerId,
        },
    };

    /*
    * Generate checksum by parameters we have in body
    * Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
    */
    PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), config.PaytmConfig.key).then(function(checksum){

        paytmParams.head = {
            "signature"    : checksum
        };

        var post_data = JSON.stringify(paytmParams);

        var options = {

            /* for Staging */
            hostname: 'securegw-stage.paytm.in',

            /* for Production */
            // hostname: 'securegw.paytm.in',

            port: 443,
            path: `/theia/api/v1/initiateTransaction?mid=${config.PaytmConfig.mid}&orderId=${orderId}`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': post_data.length
            }
        };

        var response = "";
        var post_req = https.request(options, function(post_res) {
            post_res.on('data', function (chunk) {
                response += chunk;
            });

            post_res.on('end', function(){
                callback(JSON.parse(response), orderId)
            });
        });

        post_req.write(post_data);
        post_req.end();
    });
}


exports.sendOTP = ({mobile, txnToken, orderId}, callback) => {

    var paytmParams = {};

    paytmParams.body = {
        "mobileNumber" : mobile
    };

    paytmParams.head = {
        "txnToken"     : txnToken
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/login/sendOtp?mid=${config.PaytmConfig.mid}&orderId=${orderId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
            callback(JSON.parse(response), orderId)
        });
    });

    post_req.write(post_data);
    post_req.end();        

}

exports.validateOTP = ({otp, txnToken, orderId}, callback) => {

    var paytmParams = {};

    paytmParams.body = {
        "otp"      : otp
    };

    paytmParams.head = {
        "txnToken" : txnToken
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/login/validateOtp?mid=${config.PaytmConfig.mid}&orderId=${orderId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
            callback(JSON.parse(response), orderId)
        });
    });

    post_req.write(post_data);
    post_req.end();  
    


}

exports.process = ({orderId, txnToken}, paymentOptions, callback) => {
    
    var paytmParams = {};

    paytmParams.body = {
        "requestType" : "NATIVE",
        "mid"         : config.PaytmConfig.mid,
        "orderId"     : orderId,
        "paymentMode" : "WALLET",
        "auth": "OTP",
    };

    paytmParams.head = {
        "txnToken"    : txnToken
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/processTransaction?mid=${config.PaytmConfig.mid}&orderId=${orderId}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
            response += chunk;
        });

        post_res.on('end', function(){
            console.log("Response:" , response);
            callback(response)
        });
    }); 
    post_req.write(post_data);
    post_req.end();        
}