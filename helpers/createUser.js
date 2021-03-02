const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')


module.exports = async ({
    name, 
    email, 
    mobile, 
    addresses, 
    password,
    paymentMethods,
    defaultPaymentMethod,
    myOrders
}) => new Promise(async (resolve, reject) => {



        const mobileExist = await User.findOne({mobile})
        if(mobileExist) return resolve(null)

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
            defaultPaymentMethod,
            myOrders
        })

        
        user.save().then(result => {
            resolve(result, password)
        }).catch(err => {
            reject(err)
        })
        

    })