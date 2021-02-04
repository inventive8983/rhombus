const express = require('express')
const Router = express.Router()
const cart = require('../controllers/cart')

Router.get('/clear', cart.clear)

Router.get('/orders', cart.getOrders)

Router.get('/order/:id', cart.getSingleOrder)


module.exports = Router 