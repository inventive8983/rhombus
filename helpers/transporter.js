const nodemailer = require('nodemailer')
// exporting the transporter 
exports.transporter = nodemailer.createTransport({
  host: 'email-smtp.ap-south-1.amazonaws.com',
  port: 465,
  auth: {
      user: 'AKIAR2DD4JPBAUK5SNGC',
      pass: 'BBpiN/AxhSNm+1QPN4LqiooTB0J9kyU/VRl1ygWcoi9s'
  },
  requireTLS: true,
})

// var http = require("https");

// var options = {
//   "method": "POST",
//   "hostname": "api.pepipost.com",
//   "port": null,
//   "path": "/v5/mail/send",
//   "headers": {
//     "api_key": "c3eae12f02a06d203c8c721efd85b1cc",
//     "content-type": "application/json"
//   }
// };

// var req = http.request(options, function (res) {
//   var chunks = [];

//   res.on("data", function (chunk) {
//     chunks.push(chunk);
//   });

//   res.on("end", function () {
//     var body = Buffer.concat(chunks);
//    console.log(body.toString());
//   });
// });

// req.write(JSON.stringify({
//   from: {email: 'marketingv0rdx5@pepisandbox.com', name: 'marketingv0rdx5'},
//   subject: 'Your Barcelona flight e-ticket : BCN2118050657714',
//   content: [{type: 'html', value: 'Hello Lionel, Your flight for Barcelona is confirmed.'}],
//   personalizations: [{to: [{email: 'inventive8983@gmail.com', name: 'Lionel Messi'}]}]
// }));
// req.end();