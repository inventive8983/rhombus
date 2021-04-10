const express = require('express')
const { isAdmin } = require('../../controllers/admin')
const Router = express.Router()
const controllers = require("./controllers")

Router.post('/:category/upload', isAdmin, controllers.upload)

Router.delete('/delete', isAdmin, controllers.delete)

Router.patch('/edit', isAdmin, controllers.edit)

Router.get('/', controllers.getFiles)

Router.get('/public/:name', controllers.getFile)

Router.get('/public/details/:name', controllers.getFileDetails)


module.exports = Router