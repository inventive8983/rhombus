const mongoose = require('mongoose')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const generator = require('generate-password');

module.exports = async ({
    name, 
    email, 
    mobile, 
    addresses, 
    paymentMethods,
    defaultPaymentMethod}) => new Promise(async (resolve, reject) => {


        const emailExist = await User.findOne({email})
        if(emailExist) return resolve(null)

        const mobileExist = await User.findOne({mobile})
        if(mobileExist) return resolve(null)

        var password = generator.generate({
            length: 10,
            numbers: true
        });

        console.log(password);

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