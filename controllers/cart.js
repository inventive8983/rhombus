const Order = require('../models/order')

exports.clear = async (req, res) => {
    try{
        req.session.cart = []
        console.log(req.session.cart);
        res.status(200).send("Success")
    }
    catch(e){
        res.status(400).send(e)
    }
}

exports.items = async (req,res) => {
    if(req.session.cart){
        if(req.session.cart.length){
            req.status(200).send(req.session.cart)
        }
        else{
            req.status(204).send([])
        }
    }
    else{
        req.status(204).send([])
    }
}

exports.getOrders = (req,res) => {
    Order.find({}, {orderId: 1, name: 1, phone: 1, email: 1, status: 1, _id: 1, totalAmount: 1, items: 1, date: 1}).then(orders => {
        res.status(200).send(orders)
    }).catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.getSingleOrder = (req,res) => {
    Order.findOne({_id: req.params.id}).then(order => {
        res.status(200).send(order)
    }).catch(err => {
        console.log(err);
        res.status(400).send(err)
    })
}

exports.exportAll = (req,res) => {}

