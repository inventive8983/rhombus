const express = require('express')
const Router = express.Router()
const pages = require('../controllers/pages')

Router.get("/", pages.homepage)

Router.get("/about", pages.about)

Router.get("/contact", pages.contact)

Router.get("/courses/:category", pages.allCourses)

Router.get("/course/:id", pages.course)

Router.get("/gallery", pages.gallery)

Router.get("/blogs", pages.blogs)

Router.get("/blog", pages.blogDetails)

Router.get("/login", pages.login)

Router.get("/signup", pages.signup)

Router.get("/resetpassword", pages.resetPassword)

Router.get('/comingsoon', (req, res) => {
    res.render('status-page', {
        ...req.pageData,
        icon: "coming-soon",
        title: "We are Coming Soon.",
        info: "We are currently building this feature and will be very soon launch this."
    })
})

Router.get('/checkout', pages.checkout)

Router.get('/terms', (req, res) => {res.render('terms', {...req.pageData})})

Router.get('/privacypolicy', (req, res) => {res.render('privacy', {...req.pageData})})

module.exports = Router 