const Order = require('../models/order')
const User = require('../models/user')

module.exports = async (id, status, email, meta) => {

        //Order successfull
    return new Promise((resolve, reject) => {
        Order.updateOne({orderId: id}, {$set: {
            status, meta
        }}).then(async result => {

            console.log(id, status);

            if(result.nModified === 1){
                //Send Mail to user
                //Send Mail to admin
                const orders = await Order.find({email, status: "TXN_SUCCESS"}, {items: 1})

                
                var totalItems = []
                orders.forEach(element => {
                    element.items.forEach(item => {
                        totalItems.push(item)
                    })
                });

                User.updateOne({email}, {$set: {
                    myOrders: totalItems
                }}).then(result2 => {
                    resolve(result2)
                })

            }
            else{
                reject("Some error occured")
            }

        }).catch((err) => {

            reject(err)

        })
    }) 

}