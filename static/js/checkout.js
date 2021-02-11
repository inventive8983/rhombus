$('#proceedBtn').click(() => {
    const data = $("#checkoutform").serializeArray()
    var formData = {}
    data.forEach(element => {
        formData[element.name] = element.value
    });
    $.ajax({
        url :'/api/payment/initialize',
        type: "POST", 
        data: formData, 
        success: (response) => {
            console.log(response);
            if(response.body.resultInfo.resultStatus === "S"){
                
                var paymentMode = "WALLET"

                switch(paymentMode){
                    case "WALLET":  payWithWallet({
                        mobile: formData.mobile,
                        txnToken: response.body.txnToken,
                        orderId: response.orderId
                    })
                }

            }
            else{
                console.log(response.body.resultInfo.resultMsg);
            }
        },
        error: function(error){
            console.log(error.responseText);
        }
    })
})

const processPayment = ({txnToken, orderId}, paymentOptions) => {
    $.ajax({
        url :'/api/payment/process',
        type: "POST", 
        data: {
            orderId,
            paymentOptions
        },
        headers: {'txn_token': txnToken},
        success: (response) => {
            console.log(response);
            // if(response.body.resultInfo.resultStatus === "SUCCESS"){
            //     console.log(response);
            // }
            // else{
            //     console.log(response.body.resultInfo.resultMsg);
            // }
        },
        error: (error) => {console.log(error);}
    })
}


const payWithWallet = ({mobile, txnToken, orderId}) => {

    $.ajax({
        url :'/api/payment/payWithWallet',
        type: "POST", 
        data: {mobile, orderId},
        headers: {'txn_token': txnToken},
        success: (response) => {
            console.log(response);
            if(response.body.resultInfo.resultStatus === "SUCCESS"){
                $('#otpModal').modal({
                    'show': true,
                    'backdrop': false
                })
                $('#validateOtp').click(() => {
                    validateOtp({txnToken, orderId})
                })
            }
            else{
                console.log(response.body.resultInfo.resultMsg);
            }
            
        },
        error: (error) => {console.log(error);}
    })

}



const validateOtp = ({txnToken, orderId}) => {
    
    const otp = document.getElementById('otp').value

    $.ajax({
        url :'/api/payment/validateotp',
        type: "POST", 
        data: {otp, orderId},
        headers: {'txn_token': txnToken},
        success: (response) => {
            if(response.body.resultInfo.resultStatus === "SUCCESS"){
                processPayment({txnToken, orderId}, {
                    paymentMode: "WALLET",
                    walletType: "PAYTMPG"
                })
            }
            else{
                console.log(response.body.resultInfo.resultMsg);
                document.getElementById('otp-error').innerHTML = response.body.resultInfo.resultMsg
            }
        },
        error: (error) => {console.log(error);}
    })

}


