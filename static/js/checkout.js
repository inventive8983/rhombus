var paymentOption = "OTHER"

const sendOTP = () => {

    const mobile = document.getElementById('mobile').value

    $.ajax({
        url :'/payment/sendotp',
        type: "POST", 
        data: {mobile}, 
        success: (response) => {

            console.log(response);
            document.getElementById('showMobile').innerHTML = mobile

            $('#codeModal').modal({
                'show': true,
                'backdrop': false
            })

            $('#proceedBtn').click(() => {

                document.getElementById('proceedBtn').innerHTML = '<img src="/static/image/animations/loading-circle.gif" style="filter: invert(1);" height="24px">'
                
                const code = document.getElementById('code').value

                const data = $("#checkoutform").serializeArray()
                var formData = {}
                data.forEach(element => {
                    formData[element.name] = element.value
                });
                $.ajax({
                    url :'/payment/initialize',
                    type: "POST", 
                    data: {paymentOption, hashed: response.hashed, code, ...formData}, 
                    success: (response) => {
                        document.getElementById('otp-error').innerHTML = ''
                        document.getElementById('modalLabel').innerHTML = ` <i class="fa fa-check-circle text-green"></i> 
                                                                            <span class="text-green">OTP Verified</span>`
                        document.getElementById('modalBody').innerHTML = 'We will send you a mail about the status of your payment and all the course details you want to buy. Please click on the button to proceed.'
                 
                        document.getElementById('modalFooter').innerHTML = `<button type="button" onclick="redirect('/payment?orderId=${response.order._id}&mode=${paymentOption}');" class="w-100 btn btn-primary">Proceed to Payment</button>`
                    },
                    error: function(error){
                        document.getElementById('proceedBtn').innerHTML = 'Next'
                        document.getElementById('otp-error').innerHTML = 'Invalid Code'
                        document.getElementById('code').value = ''
                    }
                })
            })
           

        },
        error: function(error){
            toast.error(error.responseText);
            // document.getElementById('proceedBtn').innerHTML = 'Proceed to payment'
        }
    })
}

$('#paytm').click(() => {
    paymentOption = "PAYTM"
})

$('#otherOptions').click(() => {
    paymentOption = "OTHER"
})


$('#verifyMobile').click(sendOTP)
$('#resendOTP').click(sendOTP)

const processPayment = ({txnToken, orderId}, paymentOptions) => {
    console.log(txnToken);
    $.ajax({
        url :`https://securegw-stage.paytm.in/theia/api/v1/processTransaction?mid=pwasbC00537792186239&orderId=${orderId}`,
        type: "POST", 
        data: {
            "head": {
                "txnToken": txnToken
            },
            "body": {
                "requestType": "NATIVE",
                "mid": "pwasbC00537792186239",
                "orderId": orderId,
                "paymentMode": "BALANCE",
                "authMode": "OTP"
            }
        },
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

function redirect(url){
    var win = window.open(url, '_blank');
    win.focus();
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


