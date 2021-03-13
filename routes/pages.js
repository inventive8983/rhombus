const express = require('express')
const Router = express.Router()
const pages = require('../controllers/pages')
const { isSignedIn } = require('../controllers/user')


Router.get("/", pages.homepage)

Router.get("/about", pages.about)

Router.get("/contact", pages.contact)

Router.get("/courses/:category", pages.allCourses)

Router.get("/course/:id", pages.course)

Router.get("/gallery", pages.gallery)

Router.get("/results", pages.results)

Router.get("/blogs", pages.blogs)

Router.get("/blog/:id", pages.blogDetails)

Router.get("/blog/content/:id", pages.blogContent)

Router.get("/login", pages.login)

Router.get("/signup", pages.signup)

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


//Dashboard
Router.get('/dashboard',isSignedIn, pages.dashboard)

Router.get('/dashboard/basicinfo', isSignedIn,pages.basicInfo)

Router.get('/dashboard/paymentinfo', isSignedIn,pages.paymentInfo)

Router.get('/dashboard/history', isSignedIn,pages.paymentHistory)

module.exports = Router 