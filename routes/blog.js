const express = require('express')
const Router = express.Router()
const blog = require('../controllers/blog')
const {isAdmin} = require('../controllers/admin')

Router.get('/all', isAdmin, blog.getBlogs)

Router.get('/:id', isAdmin, blog.viewBlog)

Router.post('/add', isAdmin, blog.addBlog)

Router.put('/:id',isAdmin, blog.updateBlog)

Router.post('/publish/:id',isAdmin, blog.publishBlog)

Router.delete('/:id',isAdmin, blog.deleteBlog)

module.exports = Router