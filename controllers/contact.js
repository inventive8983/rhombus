const { handleError } = require('../helpers/errorHandler')
const Contact  = require('../models/contact')
const  { validationResult } = require('express-validator')
const { sendMail } = require('../helpers/mail')
const Customer = require('../models/customers')

//submission  the contact
exports.contactSubmit =async (req,res)=>{

    console.log(req.body);
    //apply the validations result
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success :false,
            message: errors.array()[0].msg
        })
    }
    
    //destructuring the comming body
    var {name , email , mobile, subject, message} = req.body

    //creating the new contact
    const contact = new Contact({
        name , email, mobile ,subject, message
    })
    
    contact.save().then(() => {

            var  emailObject={
                email: "yuvrajsinghmidha@gmail.com",
                subject:"Received a query from Rhombus Education",
                html:`
                    <h1>Details are Following as :</h1>
                    <p>Name: ${name}</p>
                    <p>Email: ${email}</p>
                    <p>Contact Number: ${mobile}</p>
                    <p>Subject: ${subject}</p>
                    <p>Message: ${message}</p>
                `
            }
            sendMail(emailObject.email,emailObject.subject,emailObject.html)
            res.status(200).json({
                success :true,
                message:"Contact Information stored Successfully"
            })
            


    }).catch(err => {
        return handleError(res, err, "Please contact Support", 403)
    })
}

exports.getQueries = (req, res) => {

    Contact.find({}).then(queries => {
        res.send(queries)
    })

}

exports.getCourseQueries = (req, res) => {

    Customer.find({}).sort({_id: -1}).then(queries => {
        res.send(queries)
    })

}