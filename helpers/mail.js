// importing the module
const nodemailer = require("nodemailer");
const { transporter } = require("./transporter");


const createMail = (name, html, action, link) => {
   return  `
    <div style="margin:0;padding:0">
        <div
            style="width:100%;background-color:#f9f9f9;padding-top:60px;padding-bottom:60px;font-family:'Montserrat','Roboto',Arial,Helvetica,sans-serif">
            <div style="max-width:680px;margin-left:auto;margin-right:auto;display:block;color:#494949;">
                <div style="background-color:#fff;padding: 64px 32px 0px 32px;"><img
                        src="https://rhombuseducation.com/static/image/logo-main-black.png"
                        style="display:block;width:256px;height:auto" tabindex="0">
                </div>
                <div
                    style="background-color:#fff;padding:30px 45px;font-size:16px;line-height:1.6em;font-family:'Open Sans',Arial,Helvetica,sans-serif;white-space:normal">
                    <div>
                        <div>Hi, ${name}<br><br></div>
                        <div>
                            ${html}
                        </div>
                    </div>
                </div>
                <div style="background-color:#fff;padding:30px 45px;padding-top:0px"><a
                        href="${link}"
                        style="display:inline-block;text-decoration:none;background-color:#473bf0;color:#fff;border-radius:5px;font-size:15px;padding:11px 15px;box-sizing:border-box;min-width:225px;max-width:100%;font-weight:bold;font-family:Lato,Montserrat,Arial,Helvetica,sans-serif"
                        target="_blank">
                        <div style="text-align:center"><b>${action}</b></div>
                    </a></div>
                <div
                    style="padding-top:30px;background-color:#fff;margin-bottom:15px;border-bottom:3px solid #dddddd;border-bottom-color:#473bf0">
                </div>
    
                <div
                    style="margin-top:140px;border-top:1px solid #dddddd;padding-top:15px;padding-bottom:60px;font-size:13px;line-height:1.7em">
                    You are receiving this email because you have a account on Rhombus Education.<br><br>
    
                    This message was sent to you by Rhombus Education.<br>
                    47 D Block, Block Area, SGNR.
                </div>
            </div>
        </div>`
}


// mailing function
const sendMail = async(to,subject,html) =>{
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: "Rhombus Support <kamesh@support.rhombuseducation.com>",
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

// mailing function
const sendMailWithTemplate = async(to,subject, {name, html, action, link}) =>{
  
    // send mail with defined transport object
    await transporter.sendMail({
      from: "Rhombus Support <kamesh@support.rhombuseducation.com>",
      to: to, 
      subject:subject, 
      html: createMail(name, html, action, link)
    },
      (err, data)=>{
        if(err){
            console.log('Error in mail',err)
        }else{
            console.log("Mail send Successfully ",data.messageId)
        }
    })
}

exports.sendMail = sendMail

exports.sendMailWithTemplate = sendMailWithTemplate