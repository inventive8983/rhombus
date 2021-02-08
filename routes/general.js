const express = require('express')
const Router = express.Router()
const general = require('../controllers/general')

Router.get('/:content', general.getContent)

Router.post('/update/:content', general.updateContent)

Router.get('/media/:folder', general.getImages)

Router.delete('/media/:folder/:filename', general.deleteImage)

module.exports = Router