// importing the module
const nodemailer = require("nodemailer");
const { transporter } = require("./transporter");


// mailing function
const sendMail = async(to,subject,html) =>{
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: "Rhombus Support _mainaccount@rhombuseducation.com",
      to: to, 
      subject:subject, 
      html: html},
      (err, data)=>{
        if(err){
            console.log('Error in mail',err)
        }else{
            console.log("Mail send Successfully ",data.messageId)
        }
    })
}

exports.sendMail = sendMail