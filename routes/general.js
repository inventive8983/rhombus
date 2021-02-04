const express = require('express')
const Router = express.Router()
const general = require('../controllers/general')

Router.get('/content', general.getContent)

Router.post('/content', general.updateContent)

Router.post('/testimonials', general.updateTestimonials)

Router.get('/testimonials', general.getTestimonials)

Router.get('/media/:folder', general.getImages)

Router.delete('/media/:folder/:filename', general.deleteImage)

module.exports = Router