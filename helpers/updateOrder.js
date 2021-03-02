const Order = require('../models/order')
const User = require('../models/user')
const createUser = require('./createUser')
const { sendMail } = require('./mail')
const sendSMS = require('./SNS')
const generator = require('generate-password');

const updateOrder = async (id, status, mobile, meta) => {

    var mobile = mobile.replace("+91", "")
    //Order successfull
    return new Promise((resolve, reject) => {
        Order.updateOne({orderId: id}, {$set: {
            status, meta
        }}).then(async result => {

            if(result.n === 1){
                //Send Mail to user
                //Send Mail to admin
                const orders = await Order.find({phone: mobile, status: "TXN_SUCCESS"}, {items: 1})

                
                var totalItems = []
                orders.forEach(element => {
                    element.items.forEach(item => {
                        totalItems.push(item)
                    })
                });

                const order = await Order.findOne({orderId: id})
                
                const user = await User.findOne({mobile})

                if(user){
                    User.updateOne({mobile}, {$set: {
                        myOrders: totalItems
                    }}).then(result2 => {
                        resolve(result2)
                    })
                }
                else{

                    var password = generator.generate({
                        length: 10,
                        numbers: true
                    });

                    createUser({
                        name: order.name,
                        mobile: order.phone,
                        email: order.email,
                        addresses: [{
                            street: order.billingAddress,
                            city: order.city,
                            state: order.state,
                            country: "India",
                            pincode: order.pincode
                        }],
                        password,
                        defaultPaymentMethod: "OTHER",
                        paymentMethods: [],
                        myOrders: totalItems
                    }).then((user) => {

                        sendMail(user.email, 
                            `Order Successful`, 
                            `Your order was successful. We have created your new account successfully. To login to your dashboard, use credentials : <br /> USERNAME : ${user.mobile} <br /> PASSWORD: ${password}`)
                            .then(() => {
                                sendSMS("Your order has been done. We have mailed you the credentials to login to your dashboard on your mail. Thanks.", "+91" + mobile)
                                resolve(user)
                            })
                        

                    }).catch(err => {
                        console.log(err);
                        reject("Some error occured.")

                    })
                }
            }
            else{
                console.log(result);
                reject("Some error occured")
            }

        }).catch((err) => {
            reject(err)
        })
    }) 

}

module.exports = updateOrder