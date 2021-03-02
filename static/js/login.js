const sendOTP = () => {

    const mobile = document.getElementById('mobile').value

    $.ajax({
        url :'/payment/sendotp',
        type: "POST", 
        data: {mobile}, 
        success: (response) => {

            document.getElementById('showMobile').innerHTML = mobile
            toast.success("OTP Sent.")

            $('#changePasswordModal').modal({
                'show': true,
                'backdrop': false
            })

            $('#changePasswordBtn').click(() => {

                document.getElementById('changePasswordBtn').innerHTML = '<img src="/static/image/animations/loading-circle.gif" style="filter: invert(1);" height="24px">'
                
                const code = document.getElementById('code').value
                const password1 = document.getElementById('password1').value
                const password2 = document.getElementById('password2').value
             
                $.ajax({
                    url :'/api/user/resetWithOTP',
                    type: "POST", 
                    data: {hashed: response.hashed, code, password1, password2, mobile}, 
                    success: (response) => {
                        document.getElementById('otp-error').innerHTML = ''
                        $('#changePasswordModal').modal('hide')
                        toast.success(response.message)
                    },
                    error: function(error){
                        document.getElementById('changePasswordBtn').innerHTML = 'Reset Password'
                        document.getElementById('otp-error').innerHTML = error.responseText
                        document.getElementById('code').value = ''
                        document.getElementById('password1').value = ''
                        document.getElementById('password2').value = ''
                    }
                })
            })

        },
        error: (error) => {
            toast.error(error.responseText);
        }
    })
    
}

$('#resetPassword').click(() => {
    sendOTP()
})

$('#resendOTP').click(() => {
    sendOTP()
})