const express = require('express')
const Router = express.Router()
const cart = require('../controllers/cart')
const {isAdmin} = require('../controllers/admin')

Router.get('/clear', cart.clear)

Router.get('/orders',isAdmin, cart.getOrders)

Router.get('/order/:id',isAdmin, cart.getSingleOrder)


module.exports = Router 