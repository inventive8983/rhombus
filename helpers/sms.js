var axios = require('axios');

const verifyOTP = (session, otp) => new Promise(resolve => {

  var config = {
    method: 'get',
    url: `https://2factor.in/API/V1/${process.env.SMS_API_KEY}/SMS/VERIFY/${session}/${otp}`,
  };
  
  axios(config)
  .then(function (response) {
    resolve(response.data)
  })
  .catch(function (error) {
    resolve({"Status":"Error", "Details": "Invalid OTP"})
  });

})

const sendOTP = (mobile) => new Promise(resolve => {

  var config = {
    method: 'get',
    url: `https://2factor.in/API/V1/${process.env.SMS_API_KEY}/SMS/${mobile}/AUTOGEN`,
  };
  
  axios(config)
  .then(function (response) {
    resolve(response.data)
  })
  .catch(function (error) {
    resolve({"Status":"Error", "Details": "Unable to send OTP"})
  });

})

module.exports.verifyOTP = verifyOTP
module.exports.sendOTP = sendOTP