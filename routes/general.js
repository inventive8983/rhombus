const express = require('express')
const Router = express.Router()
const general = require('../controllers/general')
const {isAdmin} = require('../controllers/admin')

Router.get('/:content', isAdmin, general.getContent)

Router.post('/update/:content', isAdmin,general.updateContent)

Router.get('/media/:folder', isAdmin,general.getImages)

Router.delete('/media/:folder/:filename', isAdmin,general.deleteImage)

module.exports = Router