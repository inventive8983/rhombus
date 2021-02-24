const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

module.exports = async ({
    name, 
    email, 
    mobile, 
    password, 
    addresses, 
    paymentMethods,
    defaultPaymentMethod}) => new Promise(async (resolve, reject) => {


        const emailExist = await User.findOne({email})
        if(emailExist) return resolve(null)

        //Hass Password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            name,
            email,
            mobile,
            password: hashPassword,
            addresses,
            paymentMethods,
            defaultPaymentMethod
        })

        
        user.save().then(result => {
            resolve(result)
        }).catch(err => {
            reject(err)
        })
        

    })