const nodemailer = require('nodemailer')
// exporting the transporter 
exports.transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, // use SSL
  auth: {
      user: 'inventive8983@gmail.com',
      pass: 'yuvi25.sgnr'
  }
})