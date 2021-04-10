const express = require('express')
const Router = express.Router()
const upload = require('../controllers/upload')
const uploadImage = require('../helpers/upload')

Router.post('/image/:folder', uploadImage.single('file') ,upload.uploadImage)

Router.post('/fake', upload.uploadImage)

module.exports = Router